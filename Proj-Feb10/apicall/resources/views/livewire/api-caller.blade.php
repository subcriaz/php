<div>
    welcome 
    <form wire:submit='createUser'>
    <input wire:model.live="name" type-"text"></br>
    <input wire:model="email" type-"text"></br>
    <input wire:model="password" type-"text"></br>
    <button type="submit">Add new</button>
    <span><li>{{$name}}</li></span>
    </form>
</div>