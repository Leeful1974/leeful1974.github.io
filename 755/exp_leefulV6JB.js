function jailbreak(){
if (main_ret == 179 || main_ret == 0) {
  window.msgs.innerHTML="Kernel Exploit Loaded ✔ Now Load Your Payloads ...";
} 
else {
  window.msgs.innerHTML="Exploit failed! - Reboot your PS4 and try again ...";
}
}