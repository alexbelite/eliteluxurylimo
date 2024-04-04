@extends('admin.layouts.app')
@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">  
                {{Form::model($data,array('files'=>'true','class'=>'','id'=>'submit-form','autocomplete'=>'off'))}}
                <div class="form-group">
                    <label>First Name</label>
                    {{Form::text('first_name',null,array('placeholder'=>'First Name','id'=>'first_name','class'=>'form-control'))}}
                </div> 

                  <div class="form-group">
                    <label>Last Name</label>
                    {{Form::text('last_name',null,array('placeholder'=>'Last Name','id'=>'last_name','class'=>'form-control'))}}
                </div> 
                <div class="form-group">
                    <label>Email</label>
                    {{Form::email('email',null,array('placeholder'=>'Email Address','id'=>'email','class'=>'form-control'))}}
                </div> 
                <div class="form-group">
                    <label>Mobile Number</label>
                    {{Form::text('mobile',null,array('placeholder'=>'Mobile Number','id'=>'mobile','class'=>'form-control'))}}
                </div> 
               

               
                 
               
                @if(!$id)
                 <div class="form-group">
                <label>Password</label>
                {{Form::text('user_password',null,array('placeholder'=>'Password','id'=>'user_password','class'=>'form-control'))}}
                </div> 
                <div class="form-group">
                <label>Confirm Password</label>
                {{Form::text('confirm_password',null,array('placeholder'=>'Confirm Password','id'=>'confirm_password','class'=>'form-control'))}}
                </div>
                @endif
                
                <button class="btn btn-primary" id="submit-btn" type="submit"><span id="licon"></span>Save</button> 
                <a class="btn btn-secondary" href="{{route('admin.users.index')}}">Back</a> 
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
        window.location.href = '{{route('admin.users.index')}}';
      }else{
        Alert(response.message,false);
      }
    }
  }); 
});
</script>
@endsection
