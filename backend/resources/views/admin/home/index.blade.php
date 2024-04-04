@extends('admin.layouts.app')
@section('content')
<div class="row">
	<div class="col-md-6 col-lg-4">
		<a href="{{route('admin.users.index')}}">
			<div class="card card-hover">
				<div class="box bg-cyan text-center">
					<h1 class="font-light text-white">{{number_format($users_count)}}</h1>
					<h6 class="text-white">Users</h6>
				</div>
			</div></a>
		</div>
	
	</div>
	@endsection