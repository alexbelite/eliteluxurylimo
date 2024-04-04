<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Country;
use App\Models\UserDevices;
use App\Models\User; 
use App\Models\Page;


use App\Lib\Uploader;
use App\Lib\Email;
use DB;
use Hash;
use Validator;
use Str;
use Avatar;
use Image;
use JWTAuth;
 use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    // This method use for signup
    protected function signup(Request $request){
        try { 
            $data = $request->all();
            $validator = Validator::make($data, [
                'first_name'              => 'required|max:45', 
                'last_name'              => 'required|max:45', 
                'email'             => 'required|unique:users|email', 
                'mobile'             => 'required', 
                'password'          => 'required|min:8|max:45', 
                'device_type'       => 'nullable|in:IOS,ANDROID',
                'device_token'      => 'nullable', 
            ]);
            if ($validator->fails()){
                $error = $this->validationHandle($validator->messages());
                return response()->json(['status' => false, 'message' => $error],403); 
            }else{
                $token = Str::random(45);
                $formData = $request->except('password');
                $formData['password'] = Hash::make($request->get('password'));                
                $formData['token'] = $token;
                $formData['status'] = 1; 
                $formData['user_type'] = 'App'; 
                $profile_picture = "public/uploads/profile/".time().".jpg";
                $thumb = "public/uploads/profile/thumb/".time().".jpg";
                // Avatar::create(trim($request->get('name')))->save($profile_picture);
                // Avatar::create(trim($request->get('name')))->save($thumb);
                // $formData['profile_picture'] = $profile_picture;
                // $formData['thumb'] = $thumb;
                $user = User::create($formData);  
                $user = User::find($user->id);
                // Send Email   
                $email_data['link']         = '<a class="btn-mail" href="'.route('users.verify',$token).'">Verify Email Address</a>';
                $email_data['url']          = route('users.verify',$token);
                //Email::send('email-verification',$email_data,$user->email,"Verify Email Address"); 
                // if($user){
                //     UserDevices::deviceHandle([
                //         "id"            =>  $user->id,
                //         "device_type"   =>  $data['device_type'],
                //         "device_token"  =>  $data['device_token'],
                //     ]);
                // }             
                $message = "Your account has been created successfully";
                return response()->json(['status' => true, 'message' => $message,'data'=>[]]);          
            }  
        } catch (\Exception $e) { 
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]]); 
        }                     
    }

   

    // This method use for signin
    protected function signin(Request $request){
        try {
           
             $data = $request->all();
            $validator = Validator::make($data, [
                'email'         => 'required',
                'password'      => 'required',
                
            ]);
            if ($validator->fails()) {
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403); 
            } else {            
                $user = User::where('email',$data['email']);

                   
                $user= $user->first();
                if(!$user){ 
                    return response()->json(['status' => false, 'message' => 'User not exist.','data'=>[]],404);
                }else{
                    if(Hash::check($data['password'],$user->password)){
                        if($user->status==2){ 
                            return response()->json(['status' => 'verification', 'message' => 'Your email is not verified, please verify your email address.','data'=>[]],401);
                        }else if ($user->status==0){ 
                            return response()->json(['status' => false, 'message' => 'Your account is inactive, please contact to administrator.','data'=>[]],401);
                        }else{ 
                            // UserDevices::deviceHandle([
                            //     "id"       =>  $user->id,
                            //     "device_type"   =>  $data['device_type'],
                            //     "device_token"  =>  $data['device_token'],
                            // ]);
                            $jwtResponse = User::authorizeToken($user);  
                            $user->token =@$jwtResponse['token'];

                            return response()->json(['status' => true, 'message' => 'Signin successfully.','data'=>$user]);
                            
                        }
                    }else{
                        return response()->json(['status' => false, 'message' => 'Incorrect Password.','data'=>[]],404);
                    }
                }
            }
        }catch (\Exception $e) { 
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]]); 
        }  
    }

    // This method use for get profile
    public function getProfile(Request $request){  
        try{
            $userId = $request->user()->id;
            $profile = User::getProfile($userId);
            if(count($profile)>0){
                return response()->json(['status' => true, 'message' => 'User Profile','data'=>$profile]);
            }else{
                return response()->json(['status' => false, 'message' => 'User Not Found','data'=>[]]);   
            } 
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]]);         
        }  
    }

    // This method use for update profile
    public function updateProfile(Request $request){ 
        try {  
            $data = $request->all();
            $userId = $request->user()->id; 
            $validator = Validator::make($request->all(), [
                 'first_name'              => 'required|max:45', 
                'last_name'              => 'required|max:45', 
                'mobile'     => 'required|unique:users,mobile,'.$userId,
                'email'             => 'required|email|unique:users,email,'.$userId,  


            ]);
            if ($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403);  
            }else{ 
                $user = User::find($userId);
                $user->first_name = $data['first_name'];   
                $user->last_name = $data['last_name'];   
                $user->mobile = $data['mobile']; 
                $user->email = $data['email'];   
                

                if($request->file('profile_picture')!==null){
                    $destinationPath = '/uploads/profile/';
                    $responseData = Uploader::doUpload($request->file('profile_picture'),$destinationPath,true);    
                    if($responseData['status']=="true"){ 
                        $user->profile_picture = $responseData['file']; 
                        $user->thumb = $responseData['thumb']; 
                    }                             
                }                          
                if($user->save()){         
                    $data = User::getProfile($user->id);  
                    return response()->json(['status' => true, 'message' => 'Profile updated successfully.','data'=>$data]);
                }else{
                    $data = User::getProfile($user->id); 
                    return response()->json(['status' => false, 'message' => 'Unknown error accured while updating information.','data'=>$data]);
                }
            }
        }catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);         
        } 
    }

    // This method use for change password
    public function changePassword(Request $request){ 
        try {
            $data = $request->all();
            $validator = Validator::make($request->all(), [
                'current_password'          => 'required|min:8|max:45',
                'new_password'              => 'required|min:8|max:45',
                'confirm_password'          => 'required|same:new_password',
            ]);
            if ($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403); 
            }else{
                $userId = $request->user()->id; 
                $user = User::find($userId);
                if(!$user){
                    return response()->json(['status' => false, 'message' => 'User Not Found.','data'=>[]]);
                }else{
                    if(Hash::check($data['current_password'],$user->password)){
                        $user->password = bcrypt($data['new_password']);
                        $user->save();
                        return response()->json(['status' => true, 'message' => 'Password change successfully.','data'=>[]]);
                    }else{ 
                        return response()->json(['status' => false, 'message' => "Current Password doesn't match.",'data'=>[]],403);
                    }
                }
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }
    }

    // This method use for forgot password
    public function forgot(Request $request){
        try {
            $data = $request->all(); 
            $validator = Validator::make($data, ['email' => 'required|email']);
            if($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403); 
            }else{ 
                 if(isset($request->type) && $request->type =='EMAIL_REGISTER'){
                    $user = User::where('email',$data['email'])->where('role',1)->first();
                    if($user){
                        return response()->json(['status' => false, 'message' => 'Email alrady exist.'],404); 
                    }else{
                       
                            $otp = mt_rand(100000, 999999);
                            // $otp = 1234;
                            // $data['otp'] = $otp;
                            $data['email'] = $request->email;
                            Otp::where('email',$request->email)->delete();
                            Otp::create(['email'=>$request->email,'otp'=>$otp,'type'=>'Forgot Password']);
                       Email::send('email-verification',$email_data,$request->get('email'),'Reset Password Notification');     
                            return response()->json(['status' => true, 'message' => 'We have emailed an otp for password reset!','data'=>$data]); 
                        
                    }
                }
                $user = User::where('email',$data['email'])->where('role',1)->first();
                if(!$user){
                    return response()->json(['status' => false, 'message' => 'Email does not exist.'],404); 
                }else{
                    if($user->status==2){ 
                        return response()->json(['status' => false, 'message' => 'Your email is not verified.','data'=>[]],401);
                    }else if ($user->status==0){ 
                        return response()->json(['status' => false, 'message' => 'Your account is inactive, please contact to administrator.','data'=>[]],401);
                    }else{
                        $otp = mt_rand(1000, 9999);
                        // $otp = 1234;
                        // $data['otp'] = $otp;
                         $email_data['otp']         = $otp;
                       $data['email'] = $request->email;
                        Otp::where('email',$request->email)->delete();
                        Otp::create(['email'=>$request->email,'otp'=>$otp,'type'=>'Forgot Password']);
                         Email::send('reset-password',$email_data,$request->get('email'),'Reset Password Notification');    
                        return response()->json(['status' => true, 'message' => 'We have emailed an otp for password reset!','data'=>$data]); 
                    }
                }
            }
        }catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]]); 
        }
    }




      // This method use for forgot password
    public function resendOtp(Request $request){
        try {
            $data = $request->all(); 
            $validator = Validator::make($data, ['email' => 'required|email']);
            if($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403); 
            }else{ 
                $user = User::where('email',$data['email'])->where('role',1)->first();
                if(!$user){
                    return response()->json(['status' => false, 'message' => 'Email does not exist.'],404); 
                }else{
                    if($user->status==2){ 
                        return response()->json(['status' => false, 'message' => 'Your email is not verified.','data'=>[]],401);
                    }else if ($user->status==0){ 
                        return response()->json(['status' => false, 'message' => 'Your account is inactive, please contact to administrator.','data'=>[]],401);
                    }else{
                        $otp = mt_rand(100000, 999999);
                        $otp = 1234;
                        // $data['otp'] = $otp;
                        $data['email'] = $request->email;
                        Otp::where('email',$request->email)->delete();
                        Otp::create(['email'=>$request->email,'otp'=>$otp,'type'=>'Forgot Password']);
                    // Email::send('reset-password',$mail_data,$request->get('email'),'Reset Password Notification');    
                        return response()->json(['status' => true, 'message' => 'We have emailed an otp for password reset!','data'=>$data]); 
                    }
                }
            }
        }catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }
    }


    public function resetPassword(Request $request){ 
        try {
            $data = $request->all();
            $validator = Validator::make($request->all(), [
                'email'=>'required|email',
                'otp'=>'nullable',
                'new_password'              => 'required|min:8|max:45',
                'confirm_password'          => 'required|same:new_password',
            ]);
            if ($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403); 
            }else{
               $user = User::where('email',$data['email'])->first();
                if(!$user){
                    return response()->json(['status' => false, 'message' => 'Email does not exist.'],404); 
                }else{
                    if($user->status==2){ 
                        return response()->json(['status' => false, 'message' => 'Your email is not verified.','data'=>[]],401);
                    }else if ($user->status==0){ 
                        return response()->json(['status' => false, 'message' => 'Your account is inactive, please contact to administrator.','data'=>[]],401);
                    }else{
                        if($request->otp){
                                 $checkOtp = Otp::where('email',$request->email)->where('otp',$request->otp)->first();
                           if($checkOtp){
                                 $user->password = bcrypt($data['new_password']);
                                $user->save();
                                return response()->json(['status' => true, 'message' => 'Password change successfully.','data'=>[]]);
                           }
                           else{
                             return response()->json(['status' => false, 'message' => 'Invalid otp!'],401); 
                           }
                        }
                        else{
                            $user->password = bcrypt($data['new_password']);
                            $user->save();
                            return response()->json(['status' => true, 'message' => 'Password change successfully.','data'=>[]]);
                        }
                      
                        // Email::send('reset-password',$mail_data,$request->get('email'),'Reset Password Notification');    
                       
                    }
                }
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }
    }


     public function otpVerify(Request $request){ 
        try {
            $data = $request->all();
            $validator = Validator::make($request->all(), [
                'email'=>'required|email',
                'otp'=>'required',
            ]);
            if ($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403); 
            }else{
               $user = User::where('email',$data['email'])->first();
                if(!$user){
                    return response()->json(['status' => false, 'message' => 'Email does not exist.'],404); 
                }else{
                    if($user->status==2){ 
                        return response()->json(['status' => false, 'message' => 'Your email is not verified.','data'=>[]],401);
                    }else if ($user->status==0){ 
                        return response()->json(['status' => false, 'message' => 'Your account is inactive, please contact to administrator.','data'=>[]],401);
                    }else{
                       $checkOtp = Otp::where('email',$request->email)->where('otp',$request->otp)->first();
                       if($checkOtp){
                             
                            return response()->json(['status' => true, 'message' => 'Otp Verified.','data'=>$data]);
                       }
                       else{
                         return response()->json(['status' => false, 'message' => 'Invalid otp!'],401); 
                       }
                        // Email::send('reset-password',$mail_data,$request->get('email'),'Reset Password Notification');    
                       
                    }
                }
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }
    }


    // This method use for logout user.
    public function logout(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'device_type'       => 'required|in:ANDROID,IOS',
                'device_token'      => 'required',
            ]); 
            if ($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403); 
            }else{    
                 $userDevice = UserDevices::where(['device_type'=> $request['device_type'],'device_token'=>$request['device_token']])->first();
                $token = JWTAuth::getToken();
                if ($token) {
                    JWTAuth::setToken($token)->invalidate();
                }            
                if($userDevice){
                    UserDevices::where(['device_type'=> $request['device_type'],'device_token'=>$request['device_token']])->delete();
                }
                return response()->json(['status' => true, 'message' => 'Logout Successfully']);
            }  
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }     
    }

    // list of country
    public function getCountry(){
        try{
            $countries = []; 
            $countries = Country::all()->toArray();
            foreach($countries as $key => $country){
                $countries[$key]['id']  = (string) $country['id'];
                $countries[$key]['phonecode']  = (string) "+".$country['phonecode'];
            }
            return response()->json(['status' => true, 'message' => 'Country List Data','data'=>$countries]);
        }catch(\Exception $e){ 
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }
    }

 

    public function getStaticPage(Request $request){ 
        try { 
            $validator = Validator::make($request->all(), [
                'slug'          =>       'required',
            ]);
            if ($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403); 
            }else{
                //$userId = JWTAuth::toUser(JWTAuth::getToken())->id; 
                $slug = $request->get('slug');
                $page = Page::where('slug',$slug)->select('id','title','content')->first();
                if($page){
                    return response()->json(['status' => true, 'message' => 'Static page data.','data'=>$page]);
                }else{
                    return response()->json(['status' => false, 'message' => 'Invalid slug passed.','data'=>[]]);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }
    }
 

    // method for get notification

    
 


    // method of page content
    public function getPageContent(Request $request){
        try {
           
            $data = $request->all();
            $validator = Validator::make($request->all(), [
               'slug'      => 'required|max:45',  
            ]);
            if ($validator->fails()){
                $error = $this->validationHandle($validator->messages()); 
                return response()->json(['status' => false, 'message' => $error],403);  
            }else{ 
                $page = Page::where('slug',$data['slug'])->first();
                if($page){
                 return response()->json(['status' => true, 'message' => "Page data",'data'=>$page]);                
                }
                else{
                    return response()->json(['status' => false, 'message' => "Page not found",'data'=>[]]); 
                }
            }

        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }
    } 
 

   public function getSettings(Request $request){ 
        try { 
            $settings = Setting::all()->pluck('value','field_name')->toArray();
            return response()->json(['status' => true, 'message' => 'Data.','data'=>$settings]);
              
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(),'data'=>[]],403);  
        }
    }

}
