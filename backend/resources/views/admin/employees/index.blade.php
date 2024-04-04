@extends('admin.layouts.app')

@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <div class="text-right mb-2">
                    <a href="{{route('admin.employees.add')}}" class="btn btn-secondary btn-md">Add New</a>
                </div>
                <div class="table-responsive"> 
                    <table class="table table-striped table-bordered dtable" id="users-table">
                        <thead>
                            <th>Id</th>    
                            <th>Name</th>    
                            <th>company</th>    
                            <th>Email</th>    
                            <th>Phone</th>    
                            <th>Action</th>    
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
        ajax: '{!! route('admin.employees.datatables') !!}',
        columns: [
            {data: 'id', name: 'id'},
            {data: 'name', name: 'name'},
            {data: 'company', name: 'company'},
            {data: 'email', name: 'email'},
            {data: 'phone', name: 'phone'}, 
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ],
        order:[[0,'desc']]
    });
</script>
@endsection