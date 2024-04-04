@extends('admin.layouts.app')

@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <div class="text-right mb-2">
                    <a href="{{route('admin.companies.add')}}" class="btn btn-secondary btn-md">Add New</a>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped table-bordered dtable" id="users-table">
                        <thead>
                            <th width="30">id</th>    
                            <th>Name</th>     
                            <th width="90">email</th>    
                            <th width="50">logo</th>    
                            <th width="50">website</th>    
                            <th width="115">Action</th>    
                        </thead> 
                    </table>
                </div>        
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script>
     $('#users-table').DataTable({
        processing: true,
        serverSide: true, 
        ajax: '{!! route('admin.companies.datatables') !!}',
        columns: [
            {data: 'id', name: 'id'},
            {data: 'name', name: 'name'}, 
            {data: 'email', name: 'email'},
            {data: 'logo', name: 'logo'}, 
            {data: 'website', name: 'website'}, 
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ],
        order:[[0,'desc']]
    });


</script>
@endsection