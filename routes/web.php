<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });



Route::get('/home', 'WebController@index');
Route::get('/article', 'WebController@articles');
Route::get('/article/list', 'WebController@articles');
Route::get('/article/id/{id}', 'WebController@article');
Route::post('/comment/add', 'WebController@addComment');
Route::get('/classify', 'WebController@classifyList');
Route::get('/classify/{id}', 'WebController@classify');
Route::get('/favor/article_id/{id}', 'WebController@articleFavor');
Route::get('/favor/comment_id/{id}', 'WebController@commentFavor');



Route::get('/admin', 'HomeController@index');
Route::get('/admin/login', 'AuthController@showLogin')->name('admin.login');
Route::get('/{urls}', 'HomeController@index')->where('urls','(?!api/).+');





/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/
Route::get('/api/csrf_token', 'AuthController@csrfToken');
Route::get('/api/authinfo', 'UserController@authinfo');
Route::post('/api/admin/login', 'AuthController@login');
// Route::get('/api/admin/login', 'AuthController@login');
Route::get('/api/admin/logout', 'UserController@logout');


//user
Route::get('/api/user/list', 'UserController@list');
Route::post('/api/user/form/{id}', 'UserController@form');
Route::post('/api/user/form', 'UserController@form');
Route::get('/api/user/del/{id}', 'UserController@del');
Route::get('/api/user/info/{id}', 'UserController@info');

//article
Route::get('/api/article/list', 'ArticleController@list');
Route::post('/api/article/form/{id}', 'ArticleController@form');
Route::post('/api/article/form', 'ArticleController@form');
Route::get('/api/article/del/{id}', 'ArticleController@del');
Route::get('/api/article/info/{id}', 'ArticleController@info');

//classify
Route::get('/api/classify/list', 'ClassifyController@list');
Route::get('/api/classify/select_list', 'ClassifyController@select_list');
Route::get('/api/classify/additems_list', 'ClassifyController@additems_list');
Route::post('/api/classify/addtag', 'ClassifyController@addtag');
Route::post('/api/classify/form/{id}', 'ClassifyController@form');
Route::post('/api/classify/form', 'ClassifyController@form');
Route::get('/api/classify/del/{id}', 'ClassifyController@del');
Route::get('/api/classify/info/{id}', 'ClassifyController@info');

//Media
Route::get('/api/media/list', 'MediaController@list');
Route::post('/api/media/upload', 'MediaController@upload');
Route::get('/api/media/del/{id}', 'MediaController@del');
Route::get('/api/media/info/{id}', 'MediaController@info');


//comment
Route::get('/api/comment/list', 'CommentController@list');
Route::post('/api/comment/form/{id}', 'CommentController@form');
Route::post('/api/comment/form', 'CommentController@form');
Route::get('/api/comment/del/{id}', 'CommentController@del');
Route::get('/api/comment/info/{id}', 'CommentController@info');
Route::get('/api/comment/update_state/{id}', 'CommentController@update_state');



//默认
Route::get('/', 'WebController@index');














//
//
// Route::get('/', 'HomeController@index');
// Route::get('/{urls}', 'HomeController@index')->where('urls','(?!api/).+');
//
// Route::get('api/test', 'testController@index');
//
// //admins register
// Route::get('api/admin/register', 'Admin\AuthController@showRegistrationForm')->name('admin.register');
// Route::post('api/admin/register', 'Admin\AuthController@register');
//
// //admins login
// Route::get('api/admin/login', 'Admin\AuthController@showLoginForm')->name('admin.login');
// Route::post('api/admin/login', 'Admin\AuthController@login');
//
// //admins logout
// Route::get('api/admin/logout', 'Admin\AuthController@logout')->name("admin.logout");
//
//
// //Admins list
// Route::get('api/admin', 'Admin\AdminController@showAdminList');
// Route::get('api/admin/list', 'Admin\AdminController@showAdminList');
// Route::post('api/admin/edit/{id?}', 'Admin\AdminController@add');
// Route::get('api/admin/view/{id}', 'Admin\AdminController@view');
// Route::get('api/admin/del/{id}', 'Admin\AdminController@del');
// Route::get('api/admin/edit_state/{id}', 'Admin\AdminController@edit_state');
//
// //term list
// Route::get('api/term', 'TermController@showTermList');
// Route::get('api/term/list', 'TermController@showTermList');
// Route::post('api/term/edit/{id?}', 'TermController@add');
// Route::get('api/term/view/{id}', 'TermController@view');
// Route::get('api/term/del/{id}', 'TermController@del');
// // Route::get('api/term/edit_state/{id}', 'TermController@edit_state');
//
// //ou list
// Route::get('api/ou', 'OuController@showOuList');
// Route::get('api/ou/list', 'OuController@showOuList');
// Route::post('api/ou/edit/{id?}', 'OuController@add');
// Route::get('api/ou/view/{id}', 'OuController@view');
// Route::get('api/ou/del/{id}', 'OuController@del');
// Route::get('api/ou/component', 'OuController@componentlist');
// // Route::get('api/ou/edit_state/{id}', 'OuController@edit_state');
//
// //logined info
// Route::get('api/authinfo', 'Admin\AdminController@authInfo')->name("authinfo");
// //Route::auth();
//
// //setting
// Route::post('api/setting/list_configs', 'SettingController@list_configs');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
