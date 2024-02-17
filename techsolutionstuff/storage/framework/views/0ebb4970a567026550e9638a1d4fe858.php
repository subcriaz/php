
<!DOCTYPE html>
<html>
<head>
    <title>Laravel 10 Livewire CRUD Operation</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <?php echo \Livewire\Mechanisms\FrontendAssets\FrontendAssets::styles(); ?>

</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h2>Laravel 10 Livewire CRUD Operations</h2>
                    </div>
                    <div class="card-body">
                        <?php if(session()->has('message')): ?>
                            <div class="alert alert-success">
                                <?php echo e(session('message')); ?>

                            </div>
                        <?php endif; ?>
                        <?php
$__split = function ($name, $params = []) {
    return [$name, $params];
};
[$__name, $__params] = $__split('posts');

$__html = app('livewire')->mount($__name, $__params, 'lw-2698092768-0', $__slots ?? [], get_defined_vars());

echo $__html;

unset($__html);
unset($__name);
unset($__params);
unset($__split);
if (isset($__slots)) unset($__slots);
?>
                    </div>
                </div></div>
        </div>
    </div>
    <?php echo \Livewire\Mechanisms\FrontendAssets\FrontendAssets::scripts(); ?>

</body>
</html><?php /**PATH D:\php123\root\php\ivewire_crud_example\resources\views/welcome.blade.php ENDPATH**/ ?>