@extends('admin.layouts.app')

@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">  
                {{Form::model($data,array('files'=>'true','class'=>'','id'=>'submit-form','autocomplete'=>'off'))}}
                <div class="form-group">
                    <label>Name</label>
                    {{Form::text('name',null,array('placeholder'=>'Name','id'=>'name','class'=>'form-control'))}}
                </div> 

                  <div class="form-group">
                    <label>email</label>
                    {{Form::email('email',null,array('placeholder'=>'email','id'=>'email','class'=>'form-control'))}}
                </div> 

                  <div class="form-group">
                    <label>website</label>
                    {{Form::text('website',null,array('placeholder'=>'website','id'=>'website','class'=>'form-control'))}}
                </div> 
                <div class="form-group">
                    <label>Logo</label>
                    @if($id)
                    <input type="file" id="logo" data-default-file="{{($data->logo && file_exists($data->logo))?url($data->logo):''}}" name="logo" class="dropify" data-height="150" data-show-remove="false" data-allowed-file-extensions="png jpeg jpg gif"/>
                    @else
                    <input type="file" id="logo" name="logo" class="dropify" data-height="150" data-show-remove="false" data-allowed-file-extensions="png jpeg jpg gif"/>
                    @endif
                </div> 
               
                <button class="btn btn-primary" id="submit-btn" type="submit"><span id="licon"></span>Save</button> 
                <a class="btn btn-secondary" href="{{route('admin.companies.index')}}">Back</a> 
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
        window.location.href = '{{route('admin.companies.index')}}';
      }else{
        Alert(response.message,false);
      }
    }
  }); 
});
</script>
@endsection
