<div>
    @foreach($members as $post)
                <tr>
                    <td>{{ $post->id }}</td>
                    <td>{{ $post->reg_no }}</td>
                    <td>{{ $post->name }}</td>
                    <td>
                    <button wire:click="edit({{ $post->id }})" class="btn btn-primary btn-sm">Edit</button>
                    <button wire:click="delete({{ $post->id }})" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
     @endforeach
</div>
