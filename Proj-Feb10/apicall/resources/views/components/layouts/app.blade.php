<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="/app.css">
        <title>{{ $title ?? 'Page Title' }}</title>
    </head>
    <body>
        <nav>
           
            <a href="/addnew">Add New </a>
             <a href="/show">Show Users</a>
             <a href="/showone">Single</a>
              <a href="/sayhello">Hellow</a>
        </nav>
        {{ $slot }}
    </body>
</html>
