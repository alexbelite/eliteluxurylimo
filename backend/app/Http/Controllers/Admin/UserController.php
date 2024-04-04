<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth; 
use App\Lib\Helper;
use Validator;
use Session;
use Hash;
use DataTables;
class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function index(){ 
        $title = "Users";
        $breadcrumbs = [ 
            ['name'=>'Users','relation'=>'Current','url'=>'']
        ];
        return view('admin/users/index',compact('title','breadcrumbs'));
    }

    public function datatables()
    {
        $users = User::select(['id', 'first_name','last_name', 'email', 'status','created_at'])->get();

        return DataTables::of($users)
            ->addColumn('action', function ($user) {
                return '<a href="'.route('admin.users.add',$user->id).'" class="btn btn-xs btn-primary"><i class="fas fa-edit"></i> Edit</a>&nbsp;<a href="'.route('admin.users.view',$user->id).'" class="btn btn-xs btn-primary"><i class="fas fa-eye"></i> View</a>&nbsp;<a data-link="'.route('admin.users.delete').'" id="delete_'.$user->id.'" onclick="confirm_delete('.$user->id.')" href="javascript:void(0)" class="btn btn-xs btn-danger"><i class="fas fa-trash"></i> Delete</a>';
            })
            ->editColumn('status',function($user){
                return Helper::getStatus($user->status,$user->id,route('admin.users.status'));
            })   
            ->editColumn('created_at',function($user){
                return date("d M-Y",strtotime($user->created_at));
            })
            ->editColumn('name',function($user){
                return $user->first_name.' '.$user->last_name;
            })   
            ->rawColumns(['status','action','name'])
            ->make(true);
    }

    public function status(Request $request)
    {
        $id = $request->id; 
        $row = User::whereId($id)->first();
        $row->status = $row->status=='1'?'0':'1';
        $row->save(); 
        return Helper::getStatus($row->status,$id,route('admin.users.status')); 
    }
    
    public function view($id){
        $data = User::where('id',$id)->with('country')->first();
        if($data){
            $title = "Profile - " .$data->name;
            $breadcrumbs = [ 
                ['name'=>"Users",'relation'=>'link','url'=>route('admin.users.index')],
                ['name'=>$title,'relation'=>'Current','url'=>'']
            ];
            return view('admin/users/view',compact('title','breadcrumbs','data'));
        }else{
            return abort(404);
        }
    }

    public function delete(Request $request)
    {
        $user_id = $request->id;
        try{
            $delete = User::where('id','=',$user_id)->delete();   
            if($delete){
                return ["status"=>"true","message"=>"Record Deleted"]; 
            }else{
                return ["status"=>"error","message"=>"Could not deleted Record"]; 
            }
        }catch(\Exception $e){
            return ["status"=>"error","message"=>$e->getMessage()];   
        }
    }

    public function verify($token){
        try {
            $title = "Verify Email";
            $data = User::where('token',$token)->first();
            if($data){
                $data->update(['status'=>1,'token'=>'']);
                return view('admin.users/verify',compact('data','title'));
            }else{
                return abort(404);
            }
        } catch (\Exception $e) {    
            return abort(500);
        }
    }

    public function resetPassword(Request $request,$token){ 
        $title = "Set New Password";
        $user = User::where('token',$token)->first(); 
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'password'              => 'required|min:8|max:45',     
                'password_confirmation' => 'required|min:8|max:45|same:password'
            ]);
            if($validator->fails()){
                return back()->withErrors($validator);
            }else{  
                $password = Hash::make($request->get('password'));
                $user->update(['password'=>$password,'token'=>'']);
                return back();
            }
        }  
        return view('admin/users/reset-password',compact('title','token','user')); 
    }

     public function add(Request $request,$id=null){  
        if($id){
            $title = "Edit User";
            $breadcrumbs = [
                ['name'=>'User','relation'=>'link','url'=>route('admin.users.index')],
                ['name'=>'Edit Society Member','relation'=>'Current','url'=>'']
            ];
        }else{
            $title = "Add New User";
            $breadcrumbs = [
                ['name'=>'User','relation'=>'link','url'=>route('admin.users.index')],
                ['name'=>'Add New Society Member','relation'=>'Current','url'=>'']
            ];
        }
        $data = ($id)?User::find($id):array();
        if($request->ajax() && $request->isMethod('post')){
            try {
                if(isset($request->import_file)){
                    $path = $request->file('import_file');

                    $data = Excel::import(new UsersImport, $path);


                    if($data){
                        return ["status"=>"true","message"=>"Imported successfully"];    
                    }
                    else{
                        return ["status"=>"false","message"=>"Record not updated."]; 
                    } 
                }
                $rules = [
                    'first_name'              => 'required',
                    'last_name'              => 'required',
                    'email'             => 'nullable|email|unique:users,email,'.$id,          
                    'mobile'             => 'required|integer|unique:users,mobile,'.$id,          
                    'image'             => 'nullable|image',
                    
                    
                   // 'password' =>'required|min:8|max:20',
                   //  'confirm_password'=>'required|min:8|max:45|same:password', 
                ];
                if(!$id){
                    $rules['user_password']  = 'required|min:8|max:20|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x]).*$/';
                    // $rules['confirm_password']  = 'required|min:8|max:45|same:user_password';
                }
                // else{
                //     $rules['user_password']  = 'required|min:8|max:20|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x]).*$/';
                //     $rules['confirm_password']  = 'nullable|min:8|max:45|same:user_password';
                // }
                $validator = Validator::make($request->all(), $rules);
                if($validator->fails()){
                    return response()->json(array('errors' => $validator->messages()), 422);
                }else{
                    $formData = $request->except('image');
                    if($request->file('image')!==null){
                        // This code use for profile picture upload
                        $destinationPath = '/uploads/user/';
                        $responseData = Uploader::doUpload($request->file('image'),$destinationPath,true); 
                        if($responseData['status']=="true"){
                            $formData['profile_picture'] = $responseData['file'];
                            // $formData['thumb'] = $responseData['thumb'];
                        }                             
                    } 
                    if($id){     
                        if(isset($request->password)){
                            $formData['password'] =  Hash::make($request->get('password'));
                        }                   
                        $data->update($formData);
                        Session::flash('success','Member updated successfully.');
                    }else{
                        $formData['password'] =  Hash::make($request->get('password'));
                        $formData['role'] = 1;
                        User::create($formData);
                        Session::flash('success','Member created successfully.');
                    }
                    return ['status' => 'true', 'message' => 'Records updated successfully.'];
                }
            } catch (\Exception $e) {
                return ['status' => false, 'message' => $e->getMessage()];
            } 
        } 
        return view('admin/users/add',compact('id','data','title','breadcrumbs'));
    }
}
