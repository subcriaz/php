<div>
      Add user
      

    @if (session('error'))
      <div class="alert alert-error">
        {{ session('error') }}
      </div>
    @endif

    <form wire:submit='createUser'>
    id<input wire:model="selectedUserId" type-"text"></br>
    <input wire:model="name" type-"text"></br>
    <input wire:model="email" type-"text"></br>
    <input wire:model="password" type-"text"></br>
    <button type="submit">Add</button>
   
</form>
</div>
