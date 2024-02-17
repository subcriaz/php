<div>
    <div>
  
        <!--[if BLOCK]><![endif]--><?php if(session()->has('message')): ?>
            <div class="alert alert-success">
                <?php echo e(session('message')); ?>

            </div>
        <?php endif; ?> <!--[if ENDBLOCK]><![endif]-->
      
        <!--[if BLOCK]><![endif]--><?php if($updateMode): ?>
            <?php echo $__env->make('livewire.update', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php else: ?>
            <?php echo $__env->make('livewire.create', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php endif; ?> <!--[if ENDBLOCK]><![endif]-->
      
        <table class="table table-bordered mt-5">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th width="150px">Action</th>
                </tr>
            </thead>
            <tbody>
                <!--[if BLOCK]><![endif]--><?php $__currentLoopData = $posts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <tr>
                    <td><?php echo e($post->id); ?></td>
                    <td><?php echo e($post->title); ?></td>
                    <td><?php echo e($post->description); ?></td>
                    <td>
                    <button wire:click="edit(<?php echo e($post->id); ?>)" class="btn btn-primary btn-sm">Edit</button>
                    <button wire:click="delete(<?php echo e($post->id); ?>)" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?> <!--[if ENDBLOCK]><![endif]-->
            </tbody>
        </table>
    </div><?php /**PATH D:\php123\gitroot\php\techsolutionstuff\resources\views/livewire/posts.blade.php ENDPATH**/ ?>