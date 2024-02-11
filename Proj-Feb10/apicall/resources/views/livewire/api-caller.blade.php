<div>
    <form wire:submit='createUser'>
    <input wire:model="name" type-"text"></br>
    <input wire:model="email" type-"text"></br>
    <input wire:model="password" type-"text"></br>
    <button type="submit">Add</button>
    <span><li>{{$name}}</li></span>
</form>
    <ul>
    @foreach($users as $user)
    <li>{{$user['name']}}</li>
    @endforeach

    </ul>
</div>
