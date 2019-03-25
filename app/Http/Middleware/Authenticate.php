<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
      //如果是请求是 JSON 格式的数据，返回 JSON，否则跳转到登录页
      if ($request->expectsJson()) {
          return response()->json(['error' => 1, 'message' => '用户未登录!']);
      } else {
        return route('admin.login');
      }
    }
}
