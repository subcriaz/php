<div>

    @if (session()->has('flash'))
    <div class="alert alert-success">
        {{ session('flash') }}
    </div>
    @endif


    <form wire:submit='createUser'>
    id  <input wire:model="selectedUserId" type-"text"></br>
    <input wire:model.live="name" type-"text"></br>
    <input wire:model="email" type-"text"></br>
    <input wire:model="password" type-"text"></br>
    <button type="submit">Add</button>
    <span><li>{{$name}}</li></span>
    </form>

    <table>
        <thead><tr>
        <th>name</th>
        <th>email</th>
        <th>password</th>
         <th>Edit</th>
         <th>delete</th>
        </tr></thead>
    @foreach($users as $user)

    <tr wire:key="{{$user['id']}}">
        <td>{{$user['name']}}</td>
        <td>{{$user['email']}}</td>
        <td>email</td>
        <td>
            <button type="button" wire:click="deleteUser({{$user['id']}})"
            wire:confirm="want to delete?"
            >
            Edit
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
