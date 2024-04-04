@extends('admin.layouts.app')

@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">  
                {{Form::model($data,array('files'=>'true','class'=>'','id'=>'submit-form','autocomplete'=>'off'))}}
                <div class="form-group">
                    <label>First Name</label>
                    {{Form::text('first_name',null,array('placeholder'=>'Name','id'=>'first_name','class'=>'form-control'))}}
                </div> 

                <div class="form-group">
                    <label>Last Name</label>
                    {{Form::text('last_name',null,array('placeholder'=>'Last Name','id'=>'last_name','class'=>'form-control'))}}
                </div> 


                <div class="form-group">
                    <label>Company</label>
                    {{Form::select('company_id',$company,@$data->company_id,array('placeholder'=>'Company','id'=>'company_id','class'=>'form-control'))}}
                </div> 

                  <div class="form-group">
                    <label>email</label>
                    {{Form::email('email',null,array('placeholder'=>'email','id'=>'email','class'=>'form-control'))}}
                </div> 

                  <div class="form-group">
                    <label>phone</label>
                    {{Form::text('phone',null,array('placeholder'=>'phone','id'=>'phone','class'=>'form-control'))}}
                </div> 
               
                <button class="btn btn-primary" id="submit-btn" type="submit"><span id="licon"></span>Save</button> 
                <a class="btn btn-secondary" href="{{route('admin.employees.index')}}">Back</a> 
                {{Form::close()}}
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script>
$(function(){
  $('#submit-form').ajaxForm({
    beforeSubmit:function(){
      $(".error").remove();
      disable("#submit-btn",true); 
    },
    error:function(err){ 
      handleError(err);
      disable("#submit-btn",false);  
    },
    success:function(response){ 
      disable("#submit-btn",false); 
      if(response.status=='true'){
        window.location.href = '{{route('admin.employees.index')}}';
      }else{
        Alert(response.message,false);
      }
    }
  }); 
});
</script>
@endsection
