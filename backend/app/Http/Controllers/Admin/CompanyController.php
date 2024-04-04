<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Lib\Helper;
use App\Lib\Uploader;
use Session;
use DataTables;
use Validator; 
use Str; 
class CompanyController extends Controller
{
    public function __construct()
    {
        
    }

    public function add(Request $request,$id=null){  
        if($id){
            $title = "Edit Company";
            $breadcrumbs = [
                ['name'=>'Company','relation'=>'link','url'=>route('admin.companies.index')],
                ['name'=>'Edit Company','relation'=>'Current','url'=>'']
            ];
        }else{
            $title = "Add New Company";
            $breadcrumbs = [
                ['name'=>'companies','relation'=>'link','url'=>route('admin.companies.index')],
                ['name'=>'Add New Company','relation'=>'Current','url'=>'']
            ];
        }
        $data = ($id)?Company::find($id):array();
        if($request->ajax() && $request->isMethod('post')){
            try {
                $rules = [
                    'name'             => 'required|max:70|unique:companies,name,'.$id,     
                    'logo'             => 'nullable|image',
                    'website'             => 'required',
                    'email'             =>'required|email|unique:companies,email,'.$id,
                ];
                $validator = Validator::make($request->all(), $rules);
                if($validator->fails()){
                    return response()->json(array('errors' => $validator->messages()), 422);
                }else{
                    $formData = $request->except('logo');
                    $formData['slug'] = Str::slug($request->get('title'));
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
                        Session::flash('success','Company updated successfully.');
                    }else{
                        Company::create($formData);
                        Session::flash('success','Company created successfully.');
                    }
                    return ['status' => 'true', 'message' => 'Records updated successfully.'];
                }
            } catch (\Exception $e) {
                return ['status' => false, 'message' => $e->getMessage()];
            } 
        } 
        return view('admin/companies/add',compact('id','data','title','breadcrumbs'));
    }

    public function index(){ 
        $title = "companies";
        $breadcrumbs = [ 
            ['name'=>'companies','relation'=>'Current','url'=>'']
        ];
        return view('admin/companies/index',compact('title','breadcrumbs'));
    }

    public function datatables()
    {
        $pages = Company::select(['*'])->get();
        return DataTables::of($pages)
            ->addColumn('action', function ($page) {
                return '<a href="'.route('admin.companies.add',$page->id).'" class="btn btn-xs btn-primary"><i class="fas fa-edit"></i> Edit</a>&nbsp;<a data-link="'.route('admin.companies.delete').'" id="delete_'.$page->id.'" onclick="confirm_delete('.$page->id.')" href="javascript:void(0)" class="btn btn-xs btn-danger"><i class="fas fa-trash"></i> Delete</a>';
            })
            ->editColumn('status',function($page){
                return Helper::getStatus($page->status,$page->id,route('admin.companies.status'));
            })
            ->editColumn('logo',function($page){
                return Helper::getImage($page->logo,70);
            })
            ->rawColumns(['status','action','logo'])
            ->make(true);
    }

    public function status(Request $request)
    {
        if($request->ajax() && $request->isMethod('post')){
            $id = $request->id; 
            $row = Company::whereId($id)->first();
            $row->status = $row->status=='1'?'0':'1';
            $row->save(); 
            return Helper::getStatus($row->status,$id,route('admin.companies.status'));
        }
    }  

    public function delete(Request $request)
    {
        if($request->ajax() && $request->isMethod('post')){
            $id = $request->id;
            try{
                $delete = Company::where('id','=',$id)->delete();   
                if($delete){
                    return ["status"=>"true","message"=>"Record Deleted."]; 
                }else{
                    return ["status"=>"false","message"=>"Could not deleted Record."]; 
                } 
            }catch(\Exception $e){
                return ["status"=>"false","message"=>$e->getMessage()];   
            }
        }
    }
}
