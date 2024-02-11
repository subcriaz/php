<div>
    <form wire:submit='createUser'>
        id  <input wire:model="selectedUserId" type-"text"></br>
    <input wire:model="name" type-"text"></br>
    <input wire:model="email" type-"text"></br>
    <input wire:model="password" type-"text"></br>
    <button type="submit">Add</button>
    <span><li>{{$name}}</li></span>
</form>
    <table>
        <thead><tr>
        <th>name</th>
        <th>name</th>
         <th>deleye</th>
        </tr></thead>
    @foreach($users as $user)

    <tr wire:key="{{$user['id']}}">
        <td>{{$user['name']}}</td>
        <td>{{$user['id']}}</td>
        <td>
            <button type="button" wire:click="deleteUser({{$user['id']}})"
            wire:confirm="LLLLLLLLLLLLLLLLLLL"
            >{{$user['id']}}
            
        </button>
    </td>

    </tr>
    @endforeach

</table>
</div>
