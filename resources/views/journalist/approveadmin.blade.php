<table class="table highlight striped clickable">
	<thead>
		<tr>
			<th colspan="2">Journalist</th>
			<th colspan="*">Company</th>
			<th colspan="">Hear About</th>
			<th colspan="">All Inquiries</th>
			<th colspan="">Draft Inquiries</th>
			<th colspan="">Upcoming Inquiries</th>
			<th colspan="">Published Inquiries</th>
			<th colspan="">Rejected Inquiries</th>
			<th colspan="">Last Login</th>
			<th colspan="">Date Added</th>
		</tr>
	</thead>
	<tbody>
    @if(!empty($datas))
    @foreach($datas as $data)

		<tr>
			<td class="img">

             
				<div class="avatar">
					<div>@if(empty($data['photo'])) 
						<!----> <span class="initials small">@php echo  substr($data['full_name'],0,1); @endphp</span>
                        @else 
                        <img src=@php echo "https://s3-us-west-1.amazonaws.com/onepitch/profile/".$data['photo'] @endphp alt="">
                        @endif
					</div>
				</div>
               

                
			</td>
			<td  class ="MyClass">{{$data['email']}}</td>
			<td  class ="MyClass">{{$data['company']}}</td>
			<td  class ="MyClass">{{$data['hear_about']}}</td>
			<td class="buttons purpley-grey MyClass">{{$data['countInquiries']['all']}}</td>
			<td class="buttons purpley-grey MyClass">{{$data['countInquiries']['draft']}}</td>
			<td class="buttons purpley-grey MyClass">{{$data['countInquiries']['upcoming']}}</td>
			<td class="buttons purpley-grey MyClass">{{$data['countInquiries']['published']}}</td>
			<td class="buttons purpley-grey MyClass">{{$data['countInquiries']['rejected']}}</td>
			<td class="buttons purpley-grey MyClass">{{$data['countInquiries']['last_login']}}</td>  
			<td class="buttons purpley-grey MyClass"> @php echo  $data['created_at']->format('M d Y '); @endphp</td>
		</tr>

        @endforeach
				
		@endif
	</tbody>
</table>