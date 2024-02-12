<div>
     

    show userssss
    <table>
        <thead><tr>
        <th>name</th>
        <th>email</th>
        <th>password</th>
        <th>Show</th>
         <th>Edit</th>
         <th>delete</th>
        </tr></thead>
    @foreach($users as $user)

    <tr wire:key="{{$user['id']}}">
        <td>{{$user['name']}}</td>
        <td>{{$user['email']}}</td>
        <td>email</td>
        <td>
            <button type="button" wire:click="getUserById({{$user['id']}})"
            wire:confirm="want to show?"
            >
            show one
             </button>
        </td>
        <td>
            <button type="button" wire:click="editUserById({{$user['id']}})"
            wire:confirm="want to show?"
            >
            Edit one
             </button>
        </td>
        <td>
            <button type="button" wire:click="deleteUser({{$user['id']}})"
            wire:confirm="want to delete?"
            >
            delete
             </button>
        </td>
    </tr>
    @endforeach

</table>


</div>
