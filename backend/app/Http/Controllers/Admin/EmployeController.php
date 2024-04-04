<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Company;
use Auth; 
use App\Lib\Helper;
use Validator;
use Session;
use Hash;
use DataTables;
class EmployeController extends Controller
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
        $title = "Employee";
        $breadcrumbs = [ 
            ['name'=>'Employee','relation'=>'Current','url'=>'']
        ];
        return view('admin/employees/index',compact('title','breadcrumbs'));
    }

     public function add(Request $request,$id=null){  
        if($id){
            $title = "Edit Employee";
            $breadcrumbs = [
                ['name'=>'Employee','relation'=>'link','url'=>route('admin.employees.index')],
                ['name'=>'Edit Employee','relation'=>'Current','url'=>'']
            ];
        }else{
            $title = "Add New Employee";
            $breadcrumbs = [
                ['name'=>'Employee','relation'=>'link','url'=>route('admin.employees.index')],
                ['name'=>'Add New Employee','relation'=>'Current','url'=>'']
            ];
        }
        $data = ($id)?Employee::find($id):array();
        $company= Company::pluck('name','id')->toArray();
        if($request->ajax() && $request->isMethod('post')){
            try {
                $rules = [
                    'first_name'             => 'required',
                    'last_name'             => 'required',
                    // 'website'             => 'required',
                    'company_id'             => 'required',
                    'phone'             => 'required',
                    'email'             =>'required|email|unique:employees,email,'.$id,
                ];
                $validator = Validator::make($request->all(), $rules);
                if($validator->fails()){
                    return response()->json(array('errors' => $validator->messages()), 422);
                }else{
                    $formData = $request->except('logo');
                    if($request->file('logo')!==null){
                        // This code use for profile picture upload
                        $destinationPath = '/uploads/companies/';
                        $responseData = Uploader::doUpload($request->file('logo'),$destinationPath,true); 
                        if($responseData['status']=="true"){
                            $formData['logo'] = $responseData['file'];
                            $formData['thumb'] = $responseData['thumb'];
                        }                             
                    } 
                    if($id){                        
                        $data->update($formData);
                        Session::flash('success','Employee updated successfully.');
                    }else{
                        Employee::create($formData);
                        Session::flash('success','Employee created successfully.');
                    }
                    return ['status' => 'true', 'message' => 'Records updated successfully.'];
                }
            } catch (\Exception $e) {
                return ['status' => false, 'message' => $e->getMessage()];
            } 
        } 
        return view('admin/employees/add',compact('id','data','title','breadcrumbs','company'));
    }

    public function datatables()
    {
        $employees = Employee::select(['*'])->with(['company'])->get();
        // dd($employees->toArray());
        return DataTables::of($employees)
            ->addColumn('action', function ($user) {
                return '<a href="'.route('admin.employees.add',$user->id).'" class="btn btn-xs btn-primary"><i class="fas fa-edit"></i> Edit</a>&nbsp;<a data-link="'.route('admin.employees.delete').'" id="delete_'.$user->id.'" onclick="confirm_delete('.$user->id.')" href="javascript:void(0)" class="btn btn-xs btn-danger"><i class="fas fa-trash"></i> Delete</a>';
            })
           
          
            ->editColumn('name',function($user){
                return $user->first_name.' '.$user->last_name;
            }) 

              ->editColumn('company',function($user){
                return @$user->company['name'];
            })   
            ->rawColumns(['action','name','company'])
            ->make(true);
    }

   
    
    public function view($id){
        $data = Employee::where('id',$id)->with('country')->first();
        if($data){
            $title = "Profile - " .$data->name;
            $breadcrumbs = [ 
                ['name'=>"employees",'relation'=>'link','url'=>route('admin.employees.index')],
                ['name'=>$title,'relation'=>'Current','url'=>'']
            ];
            return view('admin/employees/view',compact('title','breadcrumbs','data'));
        }else{
            return abort(404);
        }
    }

    public function delete(Request $request)
    {
        $user_id = $request->id;
        try{
            $delete = Employee::where('id','=',$user_id)->delete();   
            if($delete){
                return ["status"=>"true","message"=>"Record Deleted"]; 
            }else{
                return ["status"=>"error","message"=>"Could not deleted Record"]; 
            }
        }catch(\Exception $e){
            return ["status"=>"error","message"=>$e->getMessage()];   
        }
    }

   

    }
