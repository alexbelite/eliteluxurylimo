<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::group(['namespace' => 'Api'],function($request){ 
    Route::post('reset-password', 'UserController@resetPassword'); 

    Route::post('signin', 'UserController@signin'); 
    Route::post('forgot-password', 'UserController@forgot');

    Route::post('resend-otp', 'UserController@resendOtp');
    Route::post('otp-verify', 'UserController@otpVerify');

    Route::get('get-country', 'UserController@getCountry');
    Route::post('signup', 'UserController@signup');
    Route::post('resend-verification','UserController@resendVerificationEmail');
    Route::post('page-content','UserController@getPageContent');
    Route::get('app-settings','UserController@userAppSetting');

    // Protected Routes
    Route::group(['middleware' => ['jwt']], function () { 
            
        Route::get('get-profile', 'UserController@getProfile'); 
        Route::post('logout', 'UserController@logout'); 
        Route::post('update-profile', 'UserController@updateProfile');
        Route::post('updatetoken', 'UserController@updateDeviceToken');
        Route::post('change-password', 'UserController@changePassword');
        Route::post('set-notification-status', 'UserController@setNotificationStatus'); 
        Route::get('get-notifications', 'UserController@getNotifications'); 
        Route::post('get-categories', 'UserController@getCategories'); 
        Route::post('get-settings','UserController@getSettings');
       

    });
    
});

// Route::fallback(function(){
//     return response()->json(['status'=>false,'message' => 'Page Not Found'], 404);
// });
// Route::fallback(function(){
//     return response()->json(['status'=>false,'message' => 'Unn'], 401);
// });