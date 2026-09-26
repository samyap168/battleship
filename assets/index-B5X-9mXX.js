(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,O=1029,k=1030,A=1031,ee=1033,j=33776,te=33777,M=33778,ne=33779,N=35840,re=35841,ie=35842,ae=35843,oe=36196,se=37492,ce=37496,le=37488,ue=37489,de=37490,fe=37491,pe=37808,me=37809,he=37810,ge=37811,_e=37812,ve=37813,ye=37814,be=37815,xe=37816,Se=37817,Ce=37818,we=37819,Te=37820,Ee=37821,De=36492,Oe=36494,ke=36495,Ae=36283,je=36284,Me=36285,Ne=36286,Pe=2300,P=2301,Fe=2302,Ie=2303,Le=2400,F=2401,Re=2402,ze=3200,Be=`srgb`,Ve=`srgb-linear`,He=`linear`,Ue=`srgb`,We=7680,Ge=35044,Ke=35048,qe=2e3;function Je(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ye(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Xe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ze(){let e=Xe(`canvas`);return e.style.display=`block`,e}var Qe={};function $e(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function et(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function I(...e){e=et(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function L(...e){e=et(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function tt(...e){let t=e.join(` `);t in Qe||(Qe[t]=!0,I(...e))}function nt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var rt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},it=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},at=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ot=1234567,st=Math.PI/180,ct=180/Math.PI;function lt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(at[e&255]+at[e>>8&255]+at[e>>16&255]+at[e>>24&255]+`-`+at[t&255]+at[t>>8&255]+`-`+at[t>>16&15|64]+at[t>>24&255]+`-`+at[n&63|128]+at[n>>8&255]+`-`+at[n>>16&255]+at[n>>24&255]+at[r&255]+at[r>>8&255]+at[r>>16&255]+at[r>>24&255]).toLowerCase()}function R(e,t,n){return Math.max(t,Math.min(n,e))}function ut(e,t){return(e%t+t)%t}function dt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ft(e,t,n){return e===t?0:(n-e)/(t-e)}function pt(e,t,n){return(1-n)*e+n*t}function mt(e,t,n,r){return pt(e,t,1-Math.exp(-n*r))}function ht(e,t=1){return t-Math.abs(ut(e,t*2)-t)}function gt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function _t(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function vt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function yt(e,t){return e+Math.random()*(t-e)}function bt(e){return e*(.5-Math.random())}function xt(e){e!==void 0&&(ot=e);let t=ot+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function St(e){return e*st}function Ct(e){return e*ct}function wt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Tt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Et(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Dt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:I(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Ot(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function kt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var At={DEG2RAD:st,RAD2DEG:ct,generateUUID:lt,clamp:R,euclideanModulo:ut,mapLinear:dt,inverseLerp:ft,lerp:pt,damp:mt,pingpong:ht,smoothstep:gt,smootherstep:_t,randInt:vt,randFloat:yt,randFloatSpread:bt,seededRandom:xt,degToRad:St,radToDeg:Ct,isPowerOfTwo:wt,ceilPowerOfTwo:Tt,floorPowerOfTwo:Et,setQuaternionFromProperEuler:Dt,normalize:kt,denormalize:Ot},z=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(R(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:I(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(R(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this.z=R(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this.z=R(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Mt.copy(this).projectOnVector(e),this.sub(Mt)}reflect(e){return this.sub(Mt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(R(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Mt=new B,Nt=new jt,Pt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return tt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Ft.makeScale(e,t)),this}rotate(e){return tt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Ft.makeRotation(-e)),this}translate(e,t){return tt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Ft.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ft=new Pt,It=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lt=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rt(){let e={enabled:!0,workingColorSpace:Ve,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Bt(e.r),e.g=Bt(e.g),e.b=Bt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Vt(e.r),e.g=Vt(e.g),e.b=Vt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?He:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return tt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return tt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ve]:{primaries:t,whitePoint:r,transfer:He,toXYZ:It,fromXYZ:Lt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:t,whitePoint:r,transfer:Ue,toXYZ:It,fromXYZ:Lt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}}),e}var zt=Rt();function Bt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Vt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ht,Ut=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ht===void 0&&(Ht=Xe(`canvas`)),Ht.width=e.width,Ht.height=e.height;let t=Ht.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ht}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Xe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Bt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Bt(t[e]/255)*255):t[e]=Bt(t[e]);return{data:t,width:e.width,height:e.height}}return I(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Wt=0,Gt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Wt++}),this.uuid=lt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Kt(r[t].image)):e.push(Kt(r[t]))}else e=Kt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Kt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Ut.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(I(`Texture: Unable to serialize Texture.`),{})}var qt=0,Jt=new B,Yt=class r extends it{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qt++}),this.uuid=lt(),this.name=``,this.source=new Gt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new z(0,0),this.repeat=new z(1,1),this.center=new z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jt).x}get height(){return this.source.getSize(Jt).y}get depth(){return this.source.getSize(Jt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){I(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){I(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null,Yt.DEFAULT_MAPPING=300,Yt.DEFAULT_ANISOTROPY=1;var Xt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this.z=R(this.z,e.z,t.z),this.w=R(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this.z=R(this.z,e,t),this.w=R(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Zt=class extends it{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Xt(0,0,e,t),this.scissorTest=!1,this.viewport=new Xt(0,0,e,t),this.textures=[];let r=new Yt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Gt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Qt=class extends Zt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$t=class extends Yt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},en=class extends Yt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},tn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/nn.setFromMatrixColumn(e,0).length(),i=1/nn.setFromMatrixColumn(e,1).length(),a=1/nn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(an,e,on)}lookAt(e,t,n){let r=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),sn.crossVectors(n,ln),sn.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),sn.crossVectors(n,ln)),sn.normalize(),cn.crossVectors(ln,sn),r[0]=sn.x,r[4]=cn.x,r[8]=ln.x,r[1]=sn.y,r[5]=cn.y,r[9]=ln.y,r[2]=sn.z,r[6]=cn.z,r[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],j=r[14],te=r[3],M=r[7],ne=r[11],N=r[15];return i[0]=a*x+o*T+s*k+c*te,i[4]=a*S+o*E+s*A+c*M,i[8]=a*C+o*D+s*ee+c*ne,i[12]=a*w+o*O+s*j+c*N,i[1]=l*x+u*T+d*k+f*te,i[5]=l*S+u*E+d*A+f*M,i[9]=l*C+u*D+d*ee+f*ne,i[13]=l*w+u*O+d*j+f*N,i[2]=p*x+m*T+h*k+g*te,i[6]=p*S+m*E+h*A+g*M,i[10]=p*C+m*D+h*ee+g*ne,i[14]=p*w+m*O+h*j+g*N,i[3]=_*x+v*T+y*k+b*te,i[7]=_*S+v*E+y*A+b*M,i[11]=_*C+v*D+y*ee+b*ne,i[15]=_*w+v*O+y*j+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=nn.set(r[0],r[1],r[2]).length(),o=nn.set(r[4],r[5],r[6]).length(),s=nn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),rn.copy(this);let c=1/a,l=1/o,u=1/s;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=l,rn.elements[5]*=l,rn.elements[6]*=l,rn.elements[8]*=u,rn.elements[9]*=u,rn.elements[10]*=u,t.setFromRotationMatrix(rn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=qe,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=qe,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},nn=new B,rn=new tn,an=new B(0,0,0),on=new B(1,1,1),sn=new B,cn=new B,ln=new B,un=new tn,dn=new jt,fn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(R(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-R(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(R(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-R(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(R(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-R(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:I(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return un.makeRotationFromQuaternion(e),this.setFromRotationMatrix(un,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dn.setFromEuler(this),this.setFromQuaternion(dn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};fn.DEFAULT_ORDER=`XYZ`;var pn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},mn=0,hn=new B,gn=new jt,_n=new tn,vn=new B,yn=new B,bn=new B,xn=new jt,Sn=new B(1,0,0),Cn=new B(0,1,0),wn=new B(0,0,1),Tn={type:`added`},En={type:`removed`},Dn={type:`childadded`,child:null},On={type:`childremoved`,child:null},kn=class e extends it{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mn++}),this.uuid=lt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new B,n=new fn,r=new jt,i=new B(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tn},normalMatrix:{value:new Pt}}),this.matrix=new tn,this.matrixWorld=new tn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return gn.setFromAxisAngle(e,t),this.quaternion.multiply(gn),this}rotateOnWorldAxis(e,t){return gn.setFromAxisAngle(e,t),this.quaternion.premultiply(gn),this}rotateX(e){return this.rotateOnAxis(Sn,e)}rotateY(e){return this.rotateOnAxis(Cn,e)}rotateZ(e){return this.rotateOnAxis(wn,e)}translateOnAxis(e,t){return hn.copy(e).applyQuaternion(this.quaternion),this.position.add(hn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sn,e)}translateY(e){return this.translateOnAxis(Cn,e)}translateZ(e){return this.translateOnAxis(wn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?vn.copy(e):vn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),yn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(yn,vn,this.up):_n.lookAt(vn,yn,this.up),this.quaternion.setFromRotationMatrix(_n),r&&(_n.extractRotation(r.matrixWorld),gn.setFromRotationMatrix(_n),this.quaternion.premultiply(gn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(L(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Tn),Dn.child=e,this.dispatchEvent(Dn),Dn.child=null):L(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(En),On.child=e,this.dispatchEvent(On),On.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Tn),Dn.child=e,this.dispatchEvent(Dn),Dn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yn,e,bn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yn,xn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};kn.DEFAULT_UP=new B(0,1,0),kn.DEFAULT_MATRIX_AUTO_UPDATE=!0,kn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var An=class extends kn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},jn={type:`move`},Mn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new An,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new An,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new An,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new An;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Nn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},Fn={h:0,s:0,l:0};function In(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var V=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Be){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,zt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=zt.workingColorSpace){return this.r=e,this.g=t,this.b=n,zt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=zt.workingColorSpace){if(e=ut(e,1),t=R(t,0,1),n=R(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=In(i,r,e+1/3),this.g=In(i,r,e),this.b=In(i,r,e-1/3)}return zt.colorSpaceToWorking(this,r),this}setStyle(e,t=Be){function n(t){t!==void 0&&parseFloat(t)<1&&I(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:I(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);I(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Be){let n=Nn[e.toLowerCase()];return n===void 0?I(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bt(e.r),this.g=Bt(e.g),this.b=Bt(e.b),this}copyLinearToSRGB(e){return this.r=Vt(e.r),this.g=Vt(e.g),this.b=Vt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Be){return zt.workingToColorSpace(Ln.copy(this),e),Math.round(R(Ln.r*255,0,255))*65536+Math.round(R(Ln.g*255,0,255))*256+Math.round(R(Ln.b*255,0,255))}getHexString(e=Be){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=zt.workingColorSpace){zt.workingToColorSpace(Ln.copy(this),t);let n=Ln.r,r=Ln.g,i=Ln.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=zt.workingColorSpace){return zt.workingToColorSpace(Ln.copy(this),t),e.r=Ln.r,e.g=Ln.g,e.b=Ln.b,e}getStyle(e=Be){zt.workingToColorSpace(Ln.copy(this),e);let t=Ln.r,n=Ln.g,r=Ln.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Pn),this.setHSL(Pn.h+e,Pn.s+t,Pn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pn),e.getHSL(Fn);let n=pt(Pn.h,Fn.h,t),r=pt(Pn.s,Fn.s,t),i=pt(Pn.l,Fn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ln=new V;V.NAMES=Nn;var Rn=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new V(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},zn=class extends kn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Bn=new B,Vn=new B,Hn=new B,Un=new B,Wn=new B,Gn=new B,Kn=new B,qn=new B,Jn=new B,Yn=new B,Xn=new Xt,Zn=new Xt,Qn=new Xt,$n=class e{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Bn.subVectors(e,t),r.cross(Bn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Bn.subVectors(r,t),Vn.subVectors(n,t),Hn.subVectors(e,t);let a=Bn.dot(Bn),o=Bn.dot(Vn),s=Bn.dot(Hn),c=Vn.dot(Vn),l=Vn.dot(Hn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Un)!==null&&Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Un)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Un.x),s.addScaledVector(a,Un.y),s.addScaledVector(o,Un.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Xn.setScalar(0),Zn.setScalar(0),Qn.setScalar(0),Xn.fromBufferAttribute(e,t),Zn.fromBufferAttribute(e,n),Qn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Xn,i.x),a.addScaledVector(Zn,i.y),a.addScaledVector(Qn,i.z),a}static isFrontFacing(e,t,n,r){return Bn.subVectors(n,t),Vn.subVectors(e,t),Bn.cross(Vn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),Bn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Wn.subVectors(r,n),Gn.subVectors(i,n),qn.subVectors(e,n);let s=Wn.dot(qn),c=Gn.dot(qn);if(s<=0&&c<=0)return t.copy(n);Jn.subVectors(e,r);let l=Wn.dot(Jn),u=Gn.dot(Jn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Wn,a);Yn.subVectors(e,i);let f=Wn.dot(Yn),p=Gn.dot(Yn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Gn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Kn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Kn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Wn,a).addScaledVector(Gn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},er=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=nr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,nr):nr.fromBufferAttribute(r,t),nr.applyMatrix4(e.matrixWorld),this.expandByPoint(nr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),rr.copy(e.boundingBox)),rr.applyMatrix4(e.matrixWorld),this.union(rr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nr),nr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ur),dr.subVectors(this.max,ur),ir.subVectors(e.a,ur),ar.subVectors(e.b,ur),or.subVectors(e.c,ur),sr.subVectors(ar,ir),cr.subVectors(or,ar),lr.subVectors(ir,or);let t=[0,-sr.z,sr.y,0,-cr.z,cr.y,0,-lr.z,lr.y,sr.z,0,-sr.x,cr.z,0,-cr.x,lr.z,0,-lr.x,-sr.y,sr.x,0,-cr.y,cr.x,0,-lr.y,lr.x,0];return!mr(t,ir,ar,or,dr)||(t=[1,0,0,0,1,0,0,0,1],!mr(t,ir,ar,or,dr))?!1:(fr.crossVectors(sr,cr),t=[fr.x,fr.y,fr.z],mr(t,ir,ar,or,dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(tr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),tr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),tr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),tr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),tr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),tr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),tr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),tr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(tr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},tr=[new B,new B,new B,new B,new B,new B,new B,new B],nr=new B,rr=new er,ir=new B,ar=new B,or=new B,sr=new B,cr=new B,lr=new B,ur=new B,dr=new B,fr=new B,pr=new B;function mr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){pr.fromArray(e,a);let o=i.x*Math.abs(pr.x)+i.y*Math.abs(pr.y)+i.z*Math.abs(pr.z),s=t.dot(pr),c=n.dot(pr),l=r.dot(pr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var hr=new B,gr=new z,_r=0,vr=class extends it{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_r++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ge,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)gr.fromBufferAttribute(this,t),gr.applyMatrix3(e),this.setXY(t,gr.x,gr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyMatrix3(e),this.setXYZ(t,hr.x,hr.y,hr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyMatrix4(e),this.setXYZ(t,hr.x,hr.y,hr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyNormalMatrix(e),this.setXYZ(t,hr.x,hr.y,hr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.transformDirection(e),this.setXYZ(t,hr.x,hr.y,hr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ot(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ot(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ot(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ot(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ot(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),i=kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},yr=class extends vr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},br=class extends vr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},H=class extends vr{constructor(e,t,n){super(new Float32Array(e),t,n)}},xr=new er,Sr=new B,Cr=new B,wr=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?xr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);let t=Sr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Sr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(Cr)),this.expandByPoint(Sr.copy(e.center).sub(Cr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Tr=0,Er=new tn,Dr=new kn,Or=new B,kr=new er,Ar=new er,jr=new B,Mr=class e extends it{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tr++}),this.uuid=lt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Je(e)?br:yr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Pt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Er.makeRotationFromQuaternion(e),this.applyMatrix4(Er),this}rotateX(e){return Er.makeRotationX(e),this.applyMatrix4(Er),this}rotateY(e){return Er.makeRotationY(e),this.applyMatrix4(Er),this}rotateZ(e){return Er.makeRotationZ(e),this.applyMatrix4(Er),this}translate(e,t,n){return Er.makeTranslation(e,t,n),this.applyMatrix4(Er),this}scale(e,t,n){return Er.makeScale(e,t,n),this.applyMatrix4(Er),this}lookAt(e){return Dr.lookAt(e),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Or).negate(),this.translate(Or.x,Or.y,Or.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new H(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&I(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new er);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){L(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];kr.setFromBufferAttribute(n),this.morphTargetsRelative?(jr.addVectors(this.boundingBox.min,kr.min),this.boundingBox.expandByPoint(jr),jr.addVectors(this.boundingBox.max,kr.max),this.boundingBox.expandByPoint(jr)):(this.boundingBox.expandByPoint(kr.min),this.boundingBox.expandByPoint(kr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&L(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){L(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(kr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ar.setFromBufferAttribute(n),this.morphTargetsRelative?(jr.addVectors(kr.min,Ar.min),kr.expandByPoint(jr),jr.addVectors(kr.max,Ar.max),kr.expandByPoint(jr)):(kr.expandByPoint(Ar.min),kr.expandByPoint(Ar.max))}kr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)jr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(jr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)jr.fromBufferAttribute(a,t),o&&(Or.fromBufferAttribute(e,t),jr.add(Or)),r=Math.max(r,n.distanceToSquared(jr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&L(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){L(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new vr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new B,s[e]=new B;let c=new B,l=new B,u=new B,d=new z,f=new z,p=new z,m=new B,h=new B;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new B,y=new B,b=new B,x=new B;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new vr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new B,i=new B,a=new B,o=new B,s=new B,c=new B,l=new B,u=new B;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jr.fromBufferAttribute(e,t),jr.normalize(),e.setXYZ(t,jr.x,jr.y,jr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new vr(a,r,i)}if(this.index===null)return I(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Nr=new B,Pr=new B,Fr=new Pt,Ir=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Nr.subVectors(n,t).cross(Pr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Nr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fr.getNormalMatrix(e),r=this.coplanarPoint(Nr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Lr=0,Rr=class extends it{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lr++}),this.uuid=lt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new V(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=We,this.stencilZFail=We,this.stencilZPass=We,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){I(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){I(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new V().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ir().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new z().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new z().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},zr=new B,Br=new B,Vr=new B,Hr=new B,Ur=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zr.copy(this.origin).addScaledVector(this.direction,t),zr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Br.copy(e).add(t).multiplyScalar(.5),Vr.copy(t).sub(e).normalize(),Hr.copy(this.origin).sub(Br);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Vr),o=Hr.dot(this.direction),s=-Hr.dot(Vr),c=Hr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Br).addScaledVector(Vr,d),f}intersectSphere(e,t){if(e.radius<0)return null;zr.subVectors(e.center,this.origin);let n=zr.dot(this.direction),r=zr.dot(zr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,zr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,ee,j,te;if(y>=b&&y>=x?(w=s,D=u,A=p,te=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,ee=_,j=v):(S=l,C=c,T=f,E=d,O=h,k=m,ee=v,j=_)):b>=x?(w=c,D=d,A=m,te=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,ee=v,j=g):(S=s,C=l,T=u,E=f,O=p,k=h,ee=g,j=v)):(w=l,D=f,A=h,te=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,ee=g,j=_):(S=c,C=s,T=d,E=u,O=m,k=p,ee=_,j=g)),w===0)return null;let M=S/w,ne=C/w,N=1/w,re=T-M*D,ie=E-ne*D,ae=O-M*A,oe=k-ne*A,se=ee-M*te,ce=j-ne*te,le=se*oe-ce*ae,ue=re*ce-ie*se,de=ae*ie-oe*re;if(r){if(le<0||ue<0||de<0)return null}else if((le<0||ue<0||de<0)&&(le>0||ue>0||de>0))return null;let fe=le+ue+de;if(fe===0)return null;let pe=N*(le*D+ue*A+de*te);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Wr=class extends Rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new V(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Gr=new tn,Kr=new Ur,qr=new wr,Jr=new B,Yr=new B,Xr=new B,Zr=new B,Qr=new B,$r=new B,ei=new B,ti=new B,ni=class extends kn{constructor(e=new Mr,t=new Wr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){$r.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Qr.fromBufferAttribute(s,e),a?$r.addScaledVector(Qr,r):$r.addScaledVector(Qr.sub(t),r))}t.add($r)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(i),Kr.copy(e.ray).recast(e.near),!(qr.containsPoint(Kr.origin)===!1&&(Kr.intersectSphere(qr,Jr)===null||Kr.origin.distanceToSquared(Jr)>(e.far-e.near)**2))&&(Gr.copy(i).invert(),Kr.copy(e.ray).applyMatrix4(Gr),(n.boundingBox===null||Kr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Kr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ii(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ii(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ii(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ii(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ri(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ti.copy(s),ti.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ti);return l<n.near||l>n.far?null:{distance:l,point:ti.clone(),object:e}}function ii(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Yr),e.getVertexPosition(c,Xr),e.getVertexPosition(l,Zr);let u=ri(e,t,n,r,Yr,Xr,Zr,ei);if(u){let e=new B;$n.getBarycoord(ei,Yr,Xr,Zr,e),i&&(u.uv=$n.getInterpolatedAttribute(i,s,c,l,e,new z)),a&&(u.uv1=$n.getInterpolatedAttribute(a,s,c,l,e,new z)),o&&(u.normal=$n.getInterpolatedAttribute(o,s,c,l,e,new B),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new B,materialIndex:0};$n.getNormal(Yr,Xr,Zr,t.normal),u.face=t,u.barycoord=e}return u}var ai=class extends Yt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},oi=class extends vr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},si=new tn,ci=new tn,li=[],ui=new er,di=new tn,fi=new ni,pi=new wr,mi=class extends ni{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new oi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,di)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new er),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,si),ui.copy(e.boundingBox).applyMatrix4(si),this.boundingBox.union(ui)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,si),pi.copy(e.boundingSphere).applyMatrix4(si),this.boundingSphere.union(pi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(fi.geometry=this.geometry,fi.material=this.material,fi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pi.copy(this.boundingSphere),pi.applyMatrix4(n),e.ray.intersectsSphere(pi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,si),ci.multiplyMatrices(n,si),fi.matrixWorld=ci,fi.raycast(e,li);for(let e=0,n=li.length;e<n;e++){let n=li[e];n.instanceId=i,n.object=this,t.push(n)}li.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new oi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ai(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},hi=new wr,gi=new z(.5,.5),_i=new B,vi=class{constructor(e=new Ir,t=new Ir,n=new Ir,r=new Ir,i=new Ir,a=new Ir){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=qe,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(e){return hi.center.set(0,0,0),hi.radius=.7071067811865476+gi.distanceTo(e.center),hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(_i.x=r.normal.x>0?e.max.x:e.min.x,_i.y=r.normal.y>0?e.max.y:e.min.y,_i.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_i)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},yi=class extends Rr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new V(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bi=new B,xi=new B,Si=new tn,Ci=new Ur,wi=new wr,Ti=new B,Ei=new B,Di=class extends kn{constructor(e=new Mr,t=new yi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)bi.fromBufferAttribute(t,e-1),xi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=bi.distanceTo(xi);e.setAttribute(`lineDistance`,new H(n,1))}else I(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wi.copy(n.boundingSphere),wi.applyMatrix4(r),wi.radius+=i,e.ray.intersectsSphere(wi)===!1)return;Si.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(Si);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Oi(this,e,Ci,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Oi(this,e,Ci,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Oi(this,e,Ci,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Oi(this,e,Ci,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Oi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(bi.fromBufferAttribute(s,i),xi.fromBufferAttribute(s,a),n.distanceSqToSegment(bi,xi,Ti,Ei)>r)return;Ti.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Ti);if(!(c<t.near||c>t.far))return{distance:c,point:Ei.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var ki=new B,Ai=new B,ji=class extends Di{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ki.fromBufferAttribute(t,e),Ai.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ki.distanceTo(Ai);e.setAttribute(`lineDistance`,new H(n,1))}else I(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Mi=class extends Rr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new V(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ni=new tn,Pi=new Ur,Fi=new wr,Ii=new B,Li=class extends kn{constructor(e=new Mr,t=new Mi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fi.copy(n.boundingSphere),Fi.applyMatrix4(r),Fi.radius+=i,e.ray.intersectsSphere(Fi)===!1)return;Ni.copy(r).invert(),Pi.copy(e.ray).applyMatrix4(Ni);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ii.fromBufferAttribute(l,n),Ri(Ii,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ii.fromBufferAttribute(l,a),Ri(Ii,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ri(e,t,n,r,i,a,o){let s=Pi.distanceSqToPoint(e);if(s<n){let n=new B;Pi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var zi=class extends Yt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Bi=class extends Yt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Vi=class extends Yt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Hi=class extends Vi{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ui=class extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Wi=class e extends Mr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new H(c,3)),this.setAttribute(`normal`,new H(l,3)),this.setAttribute(`uv`,new H(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new B;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Gi=class e extends Mr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new B,l=new z;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new H(a,3)),this.setAttribute(`normal`,new H(o,3)),this.setAttribute(`uv`,new H(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ki=class e extends Mr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new H(u,3)),this.setAttribute(`normal`,new H(d,3)),this.setAttribute(`uv`,new H(f,2));function _(){let a=new B,_=new B,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new z,m=new B,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},qi=class e extends Ki{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ji=class e extends Mr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new H(i,3)),this.setAttribute(`normal`,new H(i.slice(),3)),this.setAttribute(`uv`,new H(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new B,r=new B,i=new B;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new B;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new B;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new B,t=new B,n=new B,r=new B,o=new z,s=new z,c=new z;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}};function Yi(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Xi(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=ra(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Qi(a,o,n,s,c,l,0),o}function Xi(e,t,n,r,i){let a;if(i===Da(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=wa(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=wa(i/r|0,e[i],e[i+1],a);return a&&ga(a,a.next)&&(Ta(a),a=a.next),a}function Zi(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(ga(n,n.next)||ha(n.prev,n,n.next)===0)){if(Ta(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Qi(e,t,n,r,i,a,o){if(!e)return;!o&&a&&ca(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?ea(e,r,i,a):$i(e)){t.push(c.i,e.i,l.i),Ta(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=ta(Zi(e),t),Qi(e,t,n,r,i,a,2)):o===2&&na(e,t,n,r,i,a):Qi(Zi(e),t,n,r,i,a,1);break}}}function $i(e){let t=e.prev,n=e,r=e.next;if(ha(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&pa(i,s,a,c,o,l,m.x,m.y)&&ha(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ea(e,t,n,r){let i=e.prev,a=e,o=e.next;if(ha(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=ua(p,m,t,n,r),v=ua(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&pa(s,u,c,d,l,f,y.x,y.y)&&ha(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&pa(s,u,c,d,l,f,b.x,b.y)&&ha(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&pa(s,u,c,d,l,f,y.x,y.y)&&ha(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&pa(s,u,c,d,l,f,b.x,b.y)&&ha(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function ta(e,t){let n=e;do{let r=n.prev,i=n.next.next;!ga(r,i)&&_a(r,n,n.next,i)&&xa(r,i)&&xa(i,r)&&(t.push(r.i,n.i,i.i),Ta(n),Ta(n.next),n=e=i),n=n.next}while(n!==e);return Zi(n)}function na(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&ma(o,e)){let s=Ca(o,e);o=Zi(o,o.next),s=Zi(s,s.next),Qi(o,t,n,r,i,a,0),Qi(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function ra(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Xi(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(da(o))}i.sort(ia);for(let e=0;e<i.length;e++)n=aa(i[e],n);return n}function ia(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function aa(e,t){let n=oa(e,t);if(!n)return t;let r=Ca(n,e);return Zi(r,r.next),Zi(n,n.next)}function oa(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(ga(e,n))return n;do{if(ga(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&fa(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);xa(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&sa(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function sa(e,t){return ha(e.prev,e,t.prev)<0&&ha(t.next,e,e.next)<0}function ca(e,t,n,r){let i=e;do i.z===0&&(i.z=ua(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,la(i)}function la(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function ua(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function da(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function fa(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function pa(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&fa(e,t,n,r,i,a,o,s)}function ma(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!ba(e,t)&&(xa(e,t)&&xa(t,e)&&Sa(e,t)&&(ha(e.prev,e,t.prev)||ha(e,t.prev,t))||ga(e,t)&&ha(e.prev,e,e.next)>0&&ha(t.prev,t,t.next)>0)}function ha(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function ga(e,t){return e.x===t.x&&e.y===t.y}function _a(e,t,n,r){let i=ya(ha(e,t,n)),a=ya(ha(e,t,r)),o=ya(ha(n,r,e)),s=ya(ha(n,r,t));return!!(i!==a&&o!==s||i===0&&va(e,n,t)||a===0&&va(e,r,t)||o===0&&va(n,e,r)||s===0&&va(n,t,r))}function va(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function ya(e){return e>0?1:e<0?-1:0}function ba(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&_a(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function xa(e,t){return ha(e.prev,e,e.next)<0?ha(e,t,e.next)>=0&&ha(e,e.prev,t)>=0:ha(e,t,e.prev)<0||ha(e,e.next,t)<0}function Sa(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Ca(e,t){let n=Ea(e.i,e.x,e.y),r=Ea(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function wa(e,t,n,r){let i=Ea(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Ta(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Ea(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Da(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Oa=class{static triangulate(e,t,n=2){return Yi(e,t,n)}},ka=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Aa(e),ja(n,e);let a=e.length;t.forEach(Aa);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,ja(n,t[e]);let o=Oa.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Aa(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function ja(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Ma=class e extends Ji{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Na=class e extends Mr{constructor(e=[new z(0,-.5),new z(.5,0),new z(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=R(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new B,d=new z,f=new B,p=new B,m=new B,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new H(a,3)),this.setAttribute(`uv`,new H(o,2)),this.setAttribute(`normal`,new H(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Pa=class e extends Ji{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Fa=class e extends Mr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new H(p,3)),this.setAttribute(`normal`,new H(m,3)),this.setAttribute(`uv`,new H(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ia=class e extends Mr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new B,p=new z;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new H(s,3)),this.setAttribute(`normal`,new H(c,3)),this.setAttribute(`uv`,new H(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},La=class e extends Mr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new B,d=new B,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new H(p,3)),this.setAttribute(`normal`,new H(m,3)),this.setAttribute(`uv`,new H(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Ra=class e extends Mr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new B,f=new B,p=new B;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new H(c,3)),this.setAttribute(`normal`,new H(l,3)),this.setAttribute(`uv`,new H(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function za(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Va(i))i.isRenderTargetTexture?(I(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Va(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ba(e){let t={};for(let n=0;n<e.length;n++){let r=za(e[n]);for(let e in r)t[e]=r[e]}return t}function Va(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ha(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ua(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:zt.workingColorSpace}var Wa={clone:za,merge:Ba},Ga=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ka=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qa=class extends Rr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ga,this.fragmentShader=Ka,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=za(e.uniforms),this.uniformsGroups=Ha(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new V().setHex(r.value);break;case`v2`:this.uniforms[n].value=new z().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new B().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Xt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Pt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new tn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ja=class extends qa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ya=class extends Rr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new V(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new V(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Xa=class extends Ya{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new z(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return R(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new V(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new V(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new V(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Za=class extends Rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=ze,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Qa=class extends Rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function $a(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function eo(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var to=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},no=class extends to{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Le,endingEnd:Le}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case F:i=e,o=2*t-n;break;case Re:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case F:a=e,s=2*n-t;break;case Re:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ro=class extends to{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},io=class extends to{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ao=class extends to{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=co(n,t,g,y,r);i[p]=oo(x,o,_,b,m)}return i}};function oo(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function so(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function co(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=oo(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=so(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var lo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=$a(t,this.TimeBufferType),this.values=$a(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$a(e.times,Array),values:$a(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),eo(e.settings)&&(n.settings={inTangents:$a(e.settings.inTangents,Array),outTangents:$a(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ro(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new no(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ao(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Pe:t=this.InterpolantFactoryMethodDiscrete;break;case P:t=this.InterpolantFactoryMethodLinear;break;case Fe:t=this.InterpolantFactoryMethodSmooth;break;case Ie:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return I(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Pe;case this.InterpolantFactoryMethodLinear:return P;case this.InterpolantFactoryMethodSmooth:return Fe;case this.InterpolantFactoryMethodBezier:return Ie}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;eo(this.settings)&&(uo(this.settings.inTangents,e),uo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(L(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(L(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){L(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){L(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ye(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){L(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Fe,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,eo(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function uo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}lo.prototype.ValueTypeName=``,lo.prototype.TimeBufferType=Float32Array,lo.prototype.ValueBufferType=Float32Array,lo.prototype.DefaultInterpolation=P;var fo=class extends lo{constructor(e,t,n){super(e,t,n)}};fo.prototype.ValueTypeName=`bool`,fo.prototype.ValueBufferType=Array,fo.prototype.DefaultInterpolation=Pe,fo.prototype.InterpolantFactoryMethodLinear=void 0,fo.prototype.InterpolantFactoryMethodSmooth=void 0;var po=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}};po.prototype.ValueTypeName=`color`;var mo=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}};mo.prototype.ValueTypeName=`number`;var ho=class extends to{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)jt.slerpFlat(i,0,a,c-o,a,c,s);return i}},go=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ho(this.times,this.values,this.getValueSize(),e)}};go.prototype.ValueTypeName=`quaternion`,go.prototype.InterpolantFactoryMethodSmooth=void 0;var _o=class extends lo{constructor(e,t,n){super(e,t,n)}};_o.prototype.ValueTypeName=`string`,_o.prototype.ValueBufferType=Array,_o.prototype.DefaultInterpolation=Pe,_o.prototype.InterpolantFactoryMethodLinear=void 0,_o.prototype.InterpolantFactoryMethodSmooth=void 0;var vo=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}};vo.prototype.ValueTypeName=`vector`;var yo=class extends kn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new V(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},bo=class extends yo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(kn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new V(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},xo=new tn,So=new B,Co=new B,wo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new z(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new tn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vi,this._frameExtents=new z(1,1),this._viewportCount=1,this._viewports=[new Xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;So.setFromMatrixPosition(e.matrixWorld),t.position.copy(So),Co.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Co),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){xo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(xo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},To=new B,Eo=new jt,Do=new B,Oo=class extends kn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new tn,this.projectionMatrix=new tn,this.projectionMatrixInverse=new tn,this.coordinateSystem=qe,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(To,Eo,Do),Do.x===1&&Do.y===1&&Do.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(To,Eo,Do.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(To,Eo,Do),Do.x===1&&Do.y===1&&Do.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(To,Eo,Do.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ko=new B,Ao=new z,jo=new z,Mo=class extends Oo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ct*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(st*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ct*2*Math.atan(Math.tan(st*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ko.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ko.x,ko.y).multiplyScalar(-e/ko.z),ko.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ko.x,ko.y).multiplyScalar(-e/ko.z)}getViewSize(e,t){return this.getViewBounds(e,Ao,jo),t.subVectors(jo,Ao)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(st*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},No=class extends wo{constructor(){super(new Mo(90,1,.5,500)),this.isPointLightShadow=!0}},Po=class extends yo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new No}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Fo=class extends Oo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Io=class extends wo{constructor(){super(new Fo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Lo=class extends yo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(kn.DEFAULT_UP),this.updateMatrix(),this.target=new kn,this.shadow=new Io}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ro=class extends Mr{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},zo=-90,Bo=1,Vo=class extends kn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Mo(zo,Bo,e,t);r.layers=this.layers,this.add(r);let i=new Mo(zo,Bo,e,t);i.layers=this.layers,this.add(i);let a=new Mo(zo,Bo,e,t);a.layers=this.layers,this.add(a);let o=new Mo(zo,Bo,e,t);o.layers=this.layers,this.add(o);let s=new Mo(zo,Bo,e,t);s.layers=this.layers,this.add(s);let c=new Mo(zo,Bo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ho=class extends Mo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Uo=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Wo.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Wo(){this._document.hidden===!1&&this.reset()}var Go=`\\[\\]\\.:\\/`,Ko=RegExp(`[\\[\\]\\.:\\/]`,`g`),qo=`[^\\[\\]\\.:\\/]`,Jo=`[^`+Go.replace(`\\.`,``)+`]`,Yo=`((?:WC+[\\/:])*)`.replace(`WC`,qo),Xo=`(WCOD+)?`.replace(`WCOD`,Jo),Zo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,qo),Qo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,qo),$o=RegExp(`^`+Yo+Xo+Zo+Qo+`$`),es=[`material`,`materials`,`bones`,`map`],ts=class{constructor(e,t,n){let r=n||ns.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ns=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ko,``)}static parseTrackName(e){let t=$o.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);es.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){I(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){L(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){L(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){L(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){L(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){L(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){L(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){L(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;L(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){L(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){L(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ns.Composite=ts,ns.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ns.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ns.prototype.GetterByBindingType=[ns.prototype._getValue_direct,ns.prototype._getValue_array,ns.prototype._getValue_arrayElement,ns.prototype._getValue_toArray],ns.prototype.SetterByBindingTypeAndVersioning=[[ns.prototype._setValue_direct,ns.prototype._setValue_direct_setNeedsUpdate,ns.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ns.prototype._setValue_array,ns.prototype._setValue_array_setNeedsUpdate,ns.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ns.prototype._setValue_arrayElement,ns.prototype._setValue_arrayElement_setNeedsUpdate,ns.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ns.prototype._setValue_fromArray,ns.prototype._setValue_fromArray_setNeedsUpdate,ns.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rs=new tn,is=class{constructor(e,t,n=0,r=1/0){this.ray=new Ur(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new pn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):L(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return rs.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(rs),this}intersectObject(e,t=!0,n=[]){return os(e,this,n,t),n.sort(as),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)os(e[r],this,n,t);return n.sort(as),n}};function as(e,t){return e.distance-t.distance}function os(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)os(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function ss(e,t,n,r){let i=cs(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case O:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case ee:return e*t*4/i.components*i.byteLength;case j:case te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case M:case ne:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case re:case ae:return Math.max(e,16)*Math.max(t,8)/4;case N:case ie:return Math.max(e,8)*Math.max(t,8)/2;case oe:case se:case le:case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ce:case de:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case me:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Te:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ee:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case De:case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function cs(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?I(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ls(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function us(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var ds={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},U={common:{diffuse:{value:new V(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new V(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new V(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new V(16777215)},opacity:{value:1},center:{value:new z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},fs={basic:{uniforms:Ba([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.fog]),vertexShader:ds.meshbasic_vert,fragmentShader:ds.meshbasic_frag},lambert:{uniforms:Ba([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new V(0)},envMapIntensity:{value:1}}]),vertexShader:ds.meshlambert_vert,fragmentShader:ds.meshlambert_frag},phong:{uniforms:Ba([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new V(0)},specular:{value:new V(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ds.meshphong_vert,fragmentShader:ds.meshphong_frag},standard:{uniforms:Ba([U.common,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.roughnessmap,U.metalnessmap,U.fog,U.lights,{emissive:{value:new V(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ds.meshphysical_vert,fragmentShader:ds.meshphysical_frag},toon:{uniforms:Ba([U.common,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.gradientmap,U.fog,U.lights,{emissive:{value:new V(0)}}]),vertexShader:ds.meshtoon_vert,fragmentShader:ds.meshtoon_frag},matcap:{uniforms:Ba([U.common,U.bumpmap,U.normalmap,U.displacementmap,U.fog,{matcap:{value:null}}]),vertexShader:ds.meshmatcap_vert,fragmentShader:ds.meshmatcap_frag},points:{uniforms:Ba([U.points,U.fog]),vertexShader:ds.points_vert,fragmentShader:ds.points_frag},dashed:{uniforms:Ba([U.common,U.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ds.linedashed_vert,fragmentShader:ds.linedashed_frag},depth:{uniforms:Ba([U.common,U.displacementmap]),vertexShader:ds.depth_vert,fragmentShader:ds.depth_frag},normal:{uniforms:Ba([U.common,U.bumpmap,U.normalmap,U.displacementmap,{opacity:{value:1}}]),vertexShader:ds.meshnormal_vert,fragmentShader:ds.meshnormal_frag},sprite:{uniforms:Ba([U.sprite,U.fog]),vertexShader:ds.sprite_vert,fragmentShader:ds.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ds.background_vert,fragmentShader:ds.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:ds.backgroundCube_vert,fragmentShader:ds.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ds.cube_vert,fragmentShader:ds.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ds.equirect_vert,fragmentShader:ds.equirect_frag},distance:{uniforms:Ba([U.common,U.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ds.distance_vert,fragmentShader:ds.distance_frag},shadow:{uniforms:Ba([U.lights,U.fog,{color:{value:new V(0)},opacity:{value:1}}]),vertexShader:ds.shadow_vert,fragmentShader:ds.shadow_frag}};fs.physical={uniforms:Ba([fs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new V(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new V(0)},specularColor:{value:new V(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:ds.meshphysical_vert,fragmentShader:ds.meshphysical_frag};var ps={r:0,b:0,g:0},ms=new tn,hs=new Pt;hs.set(-1,0,0,0,1,0,0,0,1);function gs(e,t,n,r,i,a){let o=new V(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new ni(new Wi(1,1,1),new qa({name:`BackgroundCubeMaterial`,uniforms:za(fs.backgroundCube.uniforms),vertexShader:fs.backgroundCube.vertexShader,fragmentShader:fs.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ms.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(hs),l.material.toneMapped=zt.getTransfer(i.colorSpace)!==Ue,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new ni(new Fa(2,2),new qa({name:`BackgroundMaterial`,uniforms:za(fs.background.uniforms),vertexShader:fs.background.vertexShader,fragmentShader:fs.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=zt.getTransfer(i.colorSpace)!==Ue,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ps,Ua(e)),n.buffers.color.setClear(ps.r,ps.g,ps.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function _s(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function vs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ys(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(I(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&I(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function bs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ir,s=new Pt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var xs=4,Ss=6,Cs=20,ws=256,Ts=new Fo,Es=new V,Ds=null,Os=0,ks=0,As=!1,js=new B,Ms=new B,Ns=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=js}=i;Ds=this._renderer.getRenderTarget(),Os=this._renderer.getActiveCubeFace(),ks=this._renderer.getActiveMipmapLevel(),As=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ds,Os,ks),this._renderer.xr.enabled=As,e.scissorTest=!1,Is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ds=this._renderer.getRenderTarget(),Os=this._renderer.getActiveCubeFace(),ks=this._renderer.getActiveMipmapLevel(),As=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:Ve,depthBuffer:!1},r=Fs(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fs(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ps(r)),this._blurMaterial=Rs(r,e,t),this._ggxMaterial=Ls(r,e,t)}return r}_compileMaterial(e){let t=new ni(new Mr,e);this._renderer.compile(t,Ts)}_sceneToCubeUV(e,t,n,r,i){let a=new Mo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Es),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ni(new Wi,new Wr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Es),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Is(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Is(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ts)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-xs?n-d+xs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Is(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ts),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Is(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ts)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Is(t,3*l*(r>this._lodMax-xs?r-this._lodMax+xs:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Ts)}};function Ps(e){let t=[],n=[],r=e,i=e-xs+1+Ss;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ms.set(1,r,n):e===1?Ms.set(-n,1,-r):e===2?Ms.set(-n,r,1):e===3?Ms.set(-1,r,-n):e===4?Ms.set(-n,-1,r):Ms.set(n,r,-1),Ms.toArray(l,(e*6+t)*3)}}let u=new Mr;u.setAttribute(`position`,new vr(c,3)),u.setAttribute(`outputDirection`,new vr(l,3)),n.push(new ni(u,null)),r>xs&&r--}return{lodMeshes:n,sizeLods:t}}function Fs(e,t,n){let r=new Qt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Is(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ls(e,t,n){return new qa({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:ws,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Vs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Rs(e,t,n){return new qa({name:`SphericalGaussianBlur`,defines:{SAMPLES:Cs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Vs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function zs(){return new qa({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Vs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bs(){return new qa({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Vs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Hs=class extends Qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new zi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Wi(5,5,5),i=new qa({name:`CubemapFromEquirect`,uniforms:za(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new ni(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new Vo(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Us(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Hs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ns(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ns(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ws(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&tt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Gs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?br:yr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Ks(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function qs(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:L(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Js(e,t,n){let r=new WeakMap,i=new Xt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new $t(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new z(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ys(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Xs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Zs(e,t,n,r,i,a){let o=new Qt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Mr;l.setAttribute(`position`,new H([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new H([0,2,0,0,2,0],2));let u=new Ja({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ni(l,u),f=new Fo(-1,1,1,-1,0,1),p=null,m=null,h=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Qt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new Qt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},zt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Xs[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Qs=new Yt,$s=new Vi(1,1),ec=new $t,tc=new en,nc=new zi,rc=[],ic=[],ac=new Float32Array(16),oc=new Float32Array(9),sc=new Float32Array(4);function cc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=rc[i];if(a===void 0&&(a=new Float32Array(i),rc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function lc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function uc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function dc(e,t){let n=ic[t];n===void 0&&(n=new Int32Array(t),ic[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function fc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(lc(n,t))return;e.uniform2fv(this.addr,t),uc(n,t)}}function mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(lc(n,t))return;e.uniform3fv(this.addr,t),uc(n,t)}}function hc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(lc(n,t))return;e.uniform4fv(this.addr,t),uc(n,t)}}function gc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(lc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),uc(n,t)}else{if(lc(n,r))return;sc.set(r),e.uniformMatrix2fv(this.addr,!1,sc),uc(n,r)}}function _c(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(lc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),uc(n,t)}else{if(lc(n,r))return;oc.set(r),e.uniformMatrix3fv(this.addr,!1,oc),uc(n,r)}}function vc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(lc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),uc(n,t)}else{if(lc(n,r))return;ac.set(r),e.uniformMatrix4fv(this.addr,!1,ac),uc(n,r)}}function yc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(lc(n,t))return;e.uniform2iv(this.addr,t),uc(n,t)}}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(lc(n,t))return;e.uniform3iv(this.addr,t),uc(n,t)}}function Sc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(lc(n,t))return;e.uniform4iv(this.addr,t),uc(n,t)}}function Cc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(lc(n,t))return;e.uniform2uiv(this.addr,t),uc(n,t)}}function Tc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(lc(n,t))return;e.uniform3uiv(this.addr,t),uc(n,t)}}function Ec(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(lc(n,t))return;e.uniform4uiv(this.addr,t),uc(n,t)}}function Dc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?($s.compareFunction=n.isReversedDepthBuffer()?518:515,a=$s):a=Qs,n.setTexture2D(t||a,i)}function Oc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||tc,i)}function kc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||nc,i)}function Ac(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ec,i)}function jc(e){switch(e){case 5126:return fc;case 35664:return pc;case 35665:return mc;case 35666:return hc;case 35674:return gc;case 35675:return _c;case 35676:return vc;case 5124:case 35670:return yc;case 35667:case 35671:return bc;case 35668:case 35672:return xc;case 35669:case 35673:return Sc;case 5125:return Cc;case 36294:return wc;case 36295:return Tc;case 36296:return Ec;case 35678:case 36198:case 36298:case 36306:case 35682:return Dc;case 35679:case 36299:case 36307:return Oc;case 35680:case 36300:case 36308:case 36293:return kc;case 36289:case 36303:case 36311:case 36292:return Ac}}function Mc(e,t){e.uniform1fv(this.addr,t)}function Nc(e,t){let n=cc(t,this.size,2);e.uniform2fv(this.addr,n)}function Pc(e,t){let n=cc(t,this.size,3);e.uniform3fv(this.addr,n)}function Fc(e,t){let n=cc(t,this.size,4);e.uniform4fv(this.addr,n)}function Ic(e,t){let n=cc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Lc(e,t){let n=cc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Rc(e,t){let n=cc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function zc(e,t){e.uniform1iv(this.addr,t)}function Bc(e,t){e.uniform2iv(this.addr,t)}function Vc(e,t){e.uniform3iv(this.addr,t)}function Hc(e,t){e.uniform4iv(this.addr,t)}function Uc(e,t){e.uniform1uiv(this.addr,t)}function Wc(e,t){e.uniform2uiv(this.addr,t)}function Gc(e,t){e.uniform3uiv(this.addr,t)}function Kc(e,t){e.uniform4uiv(this.addr,t)}function qc(e,t,n){let r=this.cache,i=t.length,a=dc(n,i);lc(r,a)||(e.uniform1iv(this.addr,a),uc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?$s:Qs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Jc(e,t,n){let r=this.cache,i=t.length,a=dc(n,i);lc(r,a)||(e.uniform1iv(this.addr,a),uc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||tc,a[e])}function Yc(e,t,n){let r=this.cache,i=t.length,a=dc(n,i);lc(r,a)||(e.uniform1iv(this.addr,a),uc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||nc,a[e])}function Xc(e,t,n){let r=this.cache,i=t.length,a=dc(n,i);lc(r,a)||(e.uniform1iv(this.addr,a),uc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ec,a[e])}function Zc(e){switch(e){case 5126:return Mc;case 35664:return Nc;case 35665:return Pc;case 35666:return Fc;case 35674:return Ic;case 35675:return Lc;case 35676:return Rc;case 5124:case 35670:return zc;case 35667:case 35671:return Bc;case 35668:case 35672:return Vc;case 35669:case 35673:return Hc;case 5125:return Uc;case 36294:return Wc;case 36295:return Gc;case 36296:return Kc;case 35678:case 36198:case 36298:case 36306:case 35682:return qc;case 35679:case 36299:case 36307:return Jc;case 35680:case 36300:case 36308:case 36293:return Yc;case 36289:case 36303:case 36311:case 36292:return Xc}}var Qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jc(t.type)}},$c=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zc(t.type)}},el=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},tl=/(\w+)(\])?(\[|\.)?/g;function nl(e,t){e.seq.push(t),e.map[t.id]=t}function rl(e,t,n){let r=e.name,i=r.length;for(tl.lastIndex=0;;){let a=tl.exec(r),o=tl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){nl(n,l===void 0?new Qc(s,e,t):new $c(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new el(s),nl(n,e)),n=e}}}var il=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);rl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function al(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var ol=37297,sl=0;function cl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var ll=new Pt;function ul(e){zt._getMatrix(ll,zt.workingColorSpace,e);let t=`mat3( ${ll.elements.map(e=>e.toFixed(4))} )`;switch(zt.getTransfer(e)){case He:return[t,`LinearTransferOETF`];case Ue:return[t,`sRGBTransferOETF`];default:return I(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function dl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+cl(e.getShaderSource(t),r)}return i}function fl(e,t){let n=ul(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var pl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function ml(e,t){let n=pl[t];return n===void 0?(I(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var hl=new B;function gl(){return zt.getLuminanceCoefficients(hl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${hl.x.toFixed(4)}, ${hl.y.toFixed(4)}, ${hl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function _l(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(bl).join(`
`)}function vl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function yl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function bl(e){return e!==``}function xl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Cl=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(e){return e.replace(Cl,El)}var Tl=new Map;function El(e,t){let n=ds[t];if(n===void 0){let e=Tl.get(t);if(e!==void 0)n=ds[e],I(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return wl(n)}var Dl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ol(e){return e.replace(Dl,kl)}function kl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Al(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var jl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Ml(e){return jl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Nl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Pl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Nl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Fl={302:`ENVMAP_MODE_REFRACTION`};function Il(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Fl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ll={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Rl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ll[e.combine]||`ENVMAP_BLENDING_NONE`}function zl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Bl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ml(n),l=Pl(n),u=Il(n),d=Rl(n),f=zl(n),p=_l(n),m=vl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(bl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(bl).join(`
`),_.length>0&&(_+=`
`)):(g=[Al(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(bl).join(`
`),_=[Al(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:ds.tonemapping_pars_fragment,n.toneMapping===0?``:ml(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,ds.colorspace_pars_fragment,fl(`linearToOutputTexel`,n.outputColorSpace),gl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(bl).join(`
`)),o=wl(o),o=xl(o,n),o=Sl(o,n),s=wl(s),s=xl(s,n),s=Sl(s,n),o=Ol(o),s=Ol(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=al(i,i.VERTEX_SHADER,y),S=al(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=dl(i,x,`vertex`),n=dl(i,S,`fragment`);L(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):I(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new il(i,h),T=yl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,ol)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=sl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Vl=0,Hl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ul(e),t.set(e,n)),n}},Ul=class{constructor(e){this.id=Vl++,this.code=e,this.usedTimes=0}};function Wl(e){return e===1030||e===37490||e===36285}function Gl(e,t,n,r,i,a){let o=new pn,s=new Hl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&I(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=fs[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),te=h.isInstancedMesh===!0,M=h.isBatchedMesh===!0,ne=!!i.map,N=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,je=ve&&!!i.thicknessMap,Me=!!i.gradientMap,Ne=!!i.alphaMap,Pe=i.alphaTest>0,P=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:M,batchingColor:M&&h._colorsTexture!==null,instancing:te,instancingColor:te&&h.instanceColor!==null,instancingMorph:te&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:zt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ne,matcap:N,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&Wl(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ne,alphaTest:Pe,alphaHash:P,combine:i.combine,mapUv:ne&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:ue&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:Ae&&m(i.transmissionMap.channel),thicknessMapUv:je&&m(i.thicknessMap.channel),alphaMapUv:Ne&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ne||Ne),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:ne&&i.map.isVideoTexture===!0&&zt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&zt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=fs[t];n=Wa.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Bl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Kl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ql(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Jl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Yl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ql),r.length>1&&r.sort(t||Jl),i.length>1&&i.sort(t||Jl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Xl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Yl,e.set(t,[i])):n>=r.length?(i=new Yl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Zl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new B,color:new V};break;case`SpotLight`:n={position:new B,direction:new B,color:new V,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new B,color:new V,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new B,skyColor:new V,groundColor:new V};break;case`RectAreaLight`:n={color:new V,position:new B,halfWidth:new B,halfHeight:new B}}return e[t.id]=n,n}}}function Ql(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var $l=0;function eu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function tu(e){let t=new Zl,n=Ql(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new B);let i=new B,a=new tn,o=new tn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(eu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=U.LTC_FLOAT_1,r.rectAreaLTC2=U.LTC_FLOAT_2):(r.rectAreaLTC1=U.LTC_HALF_1,r.rectAreaLTC2=U.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=$l++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function nu(e){let t=new tu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function ru(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new nu(e),t.set(n,[a])):r>=i.length?(a=new nu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var iu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,au=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ou=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],su=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],cu=new tn,lu=new B,uu=new B;function du(e,t,n){let i=new vi,a=new z,s=new z,c=new Xt,l=new Za,u=new Qa,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new qa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new z},radius:{value:4}},vertexShader:iu,fragmentShader:au}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new Mr;y.setAttribute(`position`,new vr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new ni(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(I(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){I(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){I(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Qt(a.x,a.y,{format:k,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new Vi(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new Hs(a.x),p.map.depthTexture=new Hi(a.x,m)):(p.map=new Qt(a.x,a.y),p.map.depthTexture=new Vi(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),lu.setFromMatrixPosition(d.matrixWorld),e.position.copy(lu),uu.copy(e.position),uu.add(ou[t]),e.up.copy(su[t]),e.lookAt(uu),e.updateMatrixWorld(),n.makeTranslation(-lu.x,-lu.y,-lu.z),cu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(cu,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new Qt(a.x,a.y,{format:k,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function fu(e,t){function n(){let t=!1,n=new Xt,r=null,i=new Xt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=rt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new V(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,j=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,M=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),te=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(ne)[1]),te=M>=1);let N=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new Xt().fromArray(ie),se=new Xt().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),ue(e.CULL_FACE),_e(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:L(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:L(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:L(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:L(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(te&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+j-1),N!==t&&(e.activeTexture(t),N=t)}function Te(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+j-1:N);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Ee(){let t=re[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function P(){try{e.texImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function F(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Re(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function ze(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Be(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ve(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new V(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:P,texImage3D:Fe,pixelStorei:Le,getParameter:Ie,updateUBOMapping:ze,uniformBlockBinding:Be,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:F,viewport:Re,reset:Ve}}function pu(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new z,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Xe(`canvas`)}function T(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),I(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&I(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function D(e){return e.generateMipmaps}function O(e){l.generateMipmap(e)}function k(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function A(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];I(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||I(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?He:zt.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function ee(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,I(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function j(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),ne(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),re(t)}function ne(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&N(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function N(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function re(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let ie=0;function ae(){ie=0}function oe(){return ie}function se(e){ie=e}function ce(){let e=ie;return e>=p.maxTextures&&I(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),ie+=1,e}function le(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ue(e,t){let n=f.get(e);if(e.isVideoTexture&&P(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)I(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)I(`WebGLRenderer: Texture marked for update but image is incomplete`);else{xe(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function de(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){xe(n,e,t);return}e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t)}function fe(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){xe(n,e,t);return}d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function pe(e,t){let n=f.get(e);if(e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version){Se(n,e,t);return}d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let me={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},he={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},ge={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function _e(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&I(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,me[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,me[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,me[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,he[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,he[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,ge[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function ve(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,te));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=le(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&N(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function be(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=ye(r.start,t.width,4),c=ye(n.start,t.width,4);r.start<=o+1&&s===c&&ye(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function xe(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=ve(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=zt.getPrimaries(zt.workingColorSpace),n=t.colorSpace===``?null:zt.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=Fe(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=A(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);_e(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=j(t,e);if(t.isDepthTexture)u=ee(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&be(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=ss(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=ss(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Ie(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Ie(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&O(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Se(e,t,n){if(t.image.length!==6)return;let r=ve(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=zt.getPrimaries(zt.workingColorSpace),o=t.colorSpace===``?null:zt.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Fe(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=A(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=j(t,h);_e(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Ie(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&O(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Ce(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=A(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),Pe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Ne(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function we(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=ee(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;Pe(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ne(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ne(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=A(i.internalFormat,a,o,i.normalized,i.colorSpace);Pe(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ne(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ne(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function Te(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,te)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),_e(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else ue(t.depthTexture,0);let a=i.__webglTexture,o=Ne(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)Pe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)Pe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ee(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)Te(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?Te(t.__webglFramebuffer[0],e,0):Te(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),we(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),we(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function De(e,t,n){let r=f.get(e);t!==void 0&&Ce(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Ee(e)}function Oe(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,M);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&Pe(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=A(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=Ne(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),we(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),_e(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)Ce(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else Ce(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&O(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),_e(o,r),Ce(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&O(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),_e(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)Ce(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else Ce(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&O(i),d.unbindTexture()}e.depthBuffer&&Ee(e)}function ke(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=k(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let Ae=[],je=[];function Me(e){if(e.samples>0){if(Pe(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(Ae.length=0,je.length=0,Ae.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(Ae.push(a),je.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,je)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Ae))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Ne(e){return Math.min(p.maxSamples,e.samples)}function Pe(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function P(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(zt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&I(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):L(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ce,this.resetTextureUnits=ae,this.getTextureUnits=oe,this.setTextureUnits=se,this.setTexture2D=ue,this.setTexture2DArray=de,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=De,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function mu(e,t){function n(n,r=``){let i,a=zt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var hu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,_u=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ui(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new qa({vertexShader:hu,fragmentShader:gu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ni(new Fa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vu=class extends it{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new _u,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],O=new z,k=null,A=null,ee=new Mo;ee.viewport=new Xt;let j=new Mo;j.viewport=new Xt;let te=[ee,j],M=new Ho,ne=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Mn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Mn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Mn,C[e]=t),t.getHandSpace()};function re(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ie(){r.removeEventListener(`select`,re),r.removeEventListener(`selectstart`,re),r.removeEventListener(`selectend`,re),r.removeEventListener(`squeeze`,re),r.removeEventListener(`squeezestart`,re),r.removeEventListener(`squeezeend`,re),r.removeEventListener(`end`,ie),r.removeEventListener(`inputsourceschange`,ae);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}ne=null,N=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&I(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&I(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,re),r.addEventListener(`selectstart`,re),r.addEventListener(`selectend`,re),r.addEventListener(`squeeze`,re),r.addEventListener(`squeezestart`,re),r.addEventListener(`squeezeend`,re),r.addEventListener(`end`,ie),r.addEventListener(`inputsourceschange`,ae),b.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Qt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new Vi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Qt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ae(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let oe=new B,se=new B;function ce(e,t,n){oe.setFromMatrixPosition(t.matrixWorld),se.setFromMatrixPosition(n.matrixWorld);let r=oe.distanceTo(se),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function le(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),M.near=j.near=ee.near=t,M.far=j.far=ee.far=n,(ne!==M.near||N!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),ne=M.near,N=M.far),M.layers.mask=e.layers.mask|6,ee.layers.mask=M.layers.mask&-5,j.layers.mask=M.layers.mask&-3;let i=e.parent,a=M.cameras;le(M,i);for(let e=0;e<a.length;e++)le(a[e],i);a.length===2?ce(M,ee,j):M.projectionMatrix.copy(ee.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),ue(e,M,i)};function ue(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ct*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)},this.getCameraTexture=function(e){return v[e]};let de=null;function fe(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==M.cameras.length&&(M.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=te[n];o===void 0&&(o=new Mo,o.layers.enable(n),o.viewport=new Xt,te[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(M.matrix.copy(o.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),i===!0&&M.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Ui,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}de&&de(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let pe=new ls;pe.setAnimationLoop(fe),this.setAnimationLoop=function(e){de=e},this.dispose=function(){}}},yu=new tn,bu=new Pt;bu.set(-1,0,0,0,1,0,0,0,1);function xu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ua(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(yu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(bu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Su(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return L(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?I(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):I(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Cu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),wu=null;function Tu(){return wu===null&&(wu=new ai(Cu,16,16,k,g),wu.name=`DFG_LUT`,wu.minFilter=o,wu.magFilter=o,wu.wrapS=t,wu.wrapT=t,wu.generateMipmaps=!1,wu.needsUpdate=!0),wu}var Eu=class{constructor(e={}){let{canvas:t=Ze(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([ee,A,O]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new B,k=null,j=null,te=[],M=[],ne=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,re=!1,ie=null,ae=null,oe=null,se=null;this._outputColorSpace=Be;let ce=0,le=0,ue=null,de=-1,fe=null,pe=new Xt,me=new Xt,he=null,ge=new V(0),_e=0,ve=t.width,ye=t.height,be=1,xe=null,Se=null,Ce=new Xt(0,0,ve,ye),we=new Xt(0,0,ve,ye),Te=!1,Ee=new vi,De=!1,Oe=!1,ke=new tn,Ae=new B,je=new Xt,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return ue===null?be:1}let P=n;function Fe(e,n){return t.getContext(e,n)}let Ie,Le,F,Re,ze,Ve,He,Ue,We,Ge,Ke,Je,Ye,Xe,Qe,et,tt,rt,it,at,ot,st,ct;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ut,!1),t.addEventListener(`webglcontextrestored`,dt,!1),t.addEventListener(`webglcontextcreationerror`,ft,!1),P===null){let t=`webgl2`;if(P=Fe(t,e),P===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}lt()}catch(e){throw t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),L(`WebGLRenderer: `+e.message),e}function lt(){Ie=new Ws(P),Ie.init(),ot=new mu(P,Ie),Le=new ys(P,Ie,e,ot),F=new fu(P,Ie),Le.reversedDepthBuffer&&h&&F.buffers.depth.setReversed(!0),ae=P.createFramebuffer(),oe=P.createFramebuffer(),se=P.createFramebuffer(),Re=new qs(P),ze=new Kl,Ve=new pu(P,Ie,F,ze,Le,ot,Re),He=new Us(N),Ue=new us(P),st=new _s(P,Ue),We=new Gs(P,Ue,Re,st),Ge=new Ys(P,We,Ue,st,Re),rt=new Js(P,Le,Ve),Qe=new bs(ze),Ke=new Gl(N,He,Ie,Le,st,Qe),Je=new xu(N,ze),Ye=new Xl,Xe=new ru(Ie),tt=new gs(N,He,F,Ge,x,s),et=new du(N,Ge,Le),ct=new Su(P,Re,Le,F),it=new vs(P,Ie,Re),at=new Ks(P,Ie,Re),Re.programs=Ke.programs,N.capabilities=Le,N.extensions=Ie,N.properties=ze,N.renderLists=Ye,N.shadowMap=et,N.state=F,N.info=Re}S!==1009&&(ne=new Zs(S,t.width,t.height,o,r,i));let R=new vu(N,P);this.xr=R,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return be},this.setPixelRatio=function(e){e!==void 0&&(be=e,this.setSize(ve,ye,!1))},this.getSize=function(e){return e.set(ve,ye)},this.setSize=function(e,n,r=!0){if(R.isPresenting){I(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ve=e,ye=n,t.width=Math.floor(e*be),t.height=Math.floor(n*be),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ne!==null&&ne.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ve*be,ye*be).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,ye=n,be=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){L(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){I(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ne.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(pe)},this.getViewport=function(e){return e.copy(Ce)},this.setViewport=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),F.viewport(pe.copy(Ce).multiplyScalar(be).round())},this.getScissor=function(e){return e.copy(we)},this.setScissor=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),F.scissor(me.copy(we).multiplyScalar(be).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(e){F.setScissorTest(Te=e)},this.setOpaqueSort=function(e){xe=e},this.setTransparentSort=function(e){Se=e},this.getClearColor=function(e){return e.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(ue!==null){let t=ue.texture.format;e=C.has(t)}if(e){let e=ue.texture.type,t=w.has(e),n=tt.getClearColor(),r=tt.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,P.clearBufferuiv(P.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,P.clearBufferiv(P.COLOR,0,E))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ie=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),tt.dispose(),Ye.dispose(),Xe.dispose(),ze.dispose(),He.dispose(),Ge.dispose(),st.dispose(),ct.dispose(),Ke.dispose(),R.dispose(),R.removeEventListener(`sessionstart`,yt),R.removeEventListener(`sessionend`,bt),xt.stop()};function ut(e){e.preventDefault(),$e(`WebGLRenderer: Context Lost.`),re=!0}function dt(){$e(`WebGLRenderer: Context Restored.`),re=!1;let e=Re.autoReset,t=et.enabled,n=et.autoUpdate,r=et.needsUpdate,i=et.type;lt(),Re.autoReset=e,et.enabled=t,et.autoUpdate=n,et.needsUpdate=r,et.type=i}function ft(e){L(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function pt(e){let t=e.target;t.removeEventListener(`dispose`,pt),mt(t)}function mt(e){ht(e),ze.remove(e)}function ht(e){let t=ze.get(e).programs;t!==void 0&&(t.forEach(function(e){Ke.releaseProgram(e)}),e.isShaderMaterial&&Ke.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=z(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=We.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;st.setup(i,r,s,n,c);let h,g=it;if(c!==null&&(h=Ue.get(c),g=at,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ue.get(c).bytesPerElement:1,o=ze.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function gt(e,t,n,r){ie!==null&&e.isNodeMaterial&&ie.setObject(r,e),De===!0&&Qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Dt(e,t,r),e.side=0,e.needsUpdate=!0,Dt(e,t,r),e.side=2):Dt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),ie!==null&&ie.renderStart(e,t,n),j=Xe.get(n),j.init(t),M.push(j),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(j.pushLight(e),e.castShadow&&j.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(j.pushLight(e),e.castShadow&&j.pushShadow(e))}),j.setupLights(),ie!==null&&ie.updateLights(j.state.lightsArray),Oe=this.localClippingEnabled,De=Qe.init(this.clippingPlanes,Oe),De===!0&&Qe.setGlobalState(this.clippingPlanes,t),ie!==null&&et.render(j.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];gt(o,n,t,e),r.add(o)}else gt(i,n,t,e),r.add(i)}}),j=M.pop(),ie!==null&&ie.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=ze.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let _t=null;function vt(e){_t&&_t(e)}function yt(){xt.stop()}function bt(){xt.start()}let xt=new ls;xt.setAnimationLoop(vt),typeof self<`u`&&xt.setContext(self),this.setAnimationLoop=function(e){_t=e,R.setAnimationLoop(e),e===null?xt.stop():xt.start()},R.addEventListener(`sessionstart`,yt),R.addEventListener(`sessionend`,bt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){L(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(re===!0)return;ie!==null&&ie.renderStart(e,t);let n=R.enabled===!0&&R.isPresenting===!0,r=ne!==null&&(ue===null||n)&&ne.begin(N,ue);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),R.enabled===!0&&R.isPresenting===!0&&(ne===null||ne.isCompositing()===!1)&&(R.cameraAutoUpdate===!0&&R.updateCamera(t),t=R.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,ue),j=Xe.get(e,M.length),j.init(t),j.state.textureUnits=Ve.getTextureUnits(),M.push(j),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ee.setFromProjectionMatrix(ke,qe,t.reversedDepth),Oe=this.localClippingEnabled,De=Qe.init(this.clippingPlanes,Oe),k=Ye.get(e,te.length),k.init(),te.push(k),R.enabled===!0&&R.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&St(e,t,-1/0,N.sortObjects)}St(e,t,0,N.sortObjects),k.finish(),ie!==null&&ie.updateLights(j.state.lightsArray),N.sortObjects===!0&&k.sort(xe,Se),Ne=R.enabled===!1||R.isPresenting===!1||R.hasDepthSensing()===!1,Ne&&tt.addToRenderList(k,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),De===!0&&Qe.beginShadows();let i=j.state.shadowsArray;if(et.render(i,e,t),De===!0&&Qe.endShadows(),(r&&ne.hasRenderPass())===!1){let n=k.opaque,r=k.transmissive;if(j.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];wt(n,r,e,a)}Ne&&tt.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Ct(k,e,n,n.viewport)}}else r.length>0&&wt(n,r,e,t),Ne&&tt.render(e),Ct(k,e,t)}ue!==null&&le===0&&(Ve.updateMultisampleRenderTarget(ue),Ve.updateRenderTargetMipmap(ue)),r&&ne.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),st.resetDefaultState(),de=-1,fe=null,M.pop(),M.length>0?(j=M[M.length-1],Ve.setTextureUnits(j.state.textureUnits),De===!0&&Qe.setGlobalState(N.clippingPlanes,j.state.camera)):j=null,te.pop(),k=te.length>0?te[te.length-1]:null,ie!==null&&ie.renderEnd()};function St(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)j.pushLightProbeGrid(e);else if(e.isLight)j.pushLight(e),e.castShadow&&j.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ee)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let i=Ge.update(e),a=e.material;a.visible&&k.push(e,i,a,n,je.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ee))){let i=Ge.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),je.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&k.push(e,i,c,n,je.z,s,t)}}else a.visible&&k.push(e,i,a,n,je.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)St(i[e],t,n,r)}function Ct(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;j.setupLightsView(n),De===!0&&Qe.setGlobalState(N.clippingPlanes,n),r&&F.viewport(pe.copy(r)),i.length>0&&Tt(i,t,n),a.length>0&&Tt(a,t,n),o.length>0&&Tt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function wt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(j.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);j.state.transmissionRenderTarget[r.id]=new Qt(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:zt.workingColorSpace})}let a=j.state.transmissionRenderTarget[r.id],o=r.viewport||pe;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),u=N.getActiveCubeFace(),d=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(ge),_e=N.getClearAlpha(),_e<1&&N.setClearColor(16777215,.5),N.clear(),Ne&&tt.render(n);let f=N.toneMapping;N.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),j.setupLightsView(r),De===!0&&Qe.setGlobalState(N.clippingPlanes,r),Tt(e,n,r),Ve.updateMultisampleRenderTarget(a),Ve.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Et(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ve.updateMultisampleRenderTarget(a),Ve.updateRenderTargetMipmap(a))}N.setRenderTarget(s,u,d),N.setClearColor(ge,_e),p!==void 0&&(r.viewport=p),N.toneMapping=f}function Tt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Et(o,t,n,s,l,c)}}function Et(e,t,n,r,i,a){ie!==null&&i.isNodeMaterial&&ie.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function Dt(e,t,n){t.isScene!==!0&&(t=Me);let r=ze.get(e),i=j.state.lights,a=j.state.shadowsArray,o=i.state.version,s=Ke.getParameters(e,i.state,a,t,n,j.state.lightProbeGridArray),c=Ke.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=He.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,pt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return kt(e,s),d}else s.uniforms=Ke.getUniforms(e),ie!==null&&e.isNodeMaterial&&ie.build(e,n,s),e.onBeforeCompile(s,N),d=Ke.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Qe.uniform),kt(e,s),r.needsLights=Mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=j.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=il.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function kt(e,t){let n=ze.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function At(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function z(e,t,n,r,i){t.isScene!==!0&&(t=Me),Ve.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=ue===null?N.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:zt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=He.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=ze.get(r),y=j.state.lights;if(De===!0&&(Oe===!0||e!==fe)){let t=e===fe&&r.id===de;Qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Qe.numPlanes||v.numIntersection!==Qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=j.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Dt(r,t,i),ie&&r.isNodeMaterial&&ie.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(F.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==de&&(de=r.id,C=!0),v.needsLights){let e=At(j.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||fe!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(P,`projectionMatrix`,e.projectionMatrix),T.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(P,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&T.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),fe!==e&&(fe=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(P,`sunShadowMap`,y.state.sunShadowMap,Ve),y.state.directionalShadowMap.length>0&&T.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,Ve),y.state.spotShadowMap.length>0&&T.setValue(P,`spotShadowMap`,y.state.spotShadowMap,Ve),y.state.pointShadowMap.length>0&&T.setValue(P,`pointShadowMap`,y.state.pointShadowMap,Ve)),i.isSkinnedMesh){T.setOptional(P,i,`bindMatrix`),T.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(P,`boneTexture`,e.boneTexture,Ve))}i.isBatchedMesh&&(T.setOptional(P,i,`batchingTexture`),T.setValue(P,`batchingTexture`,i._matricesTexture,Ve),T.setOptional(P,i,`batchingIdTexture`),T.setValue(P,`batchingIdTexture`,i._indirectTexture,Ve),T.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(P,`batchingColorTexture`,i._colorsTexture,Ve));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&rt.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Tu()),C){if(T.setValue(P,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&jt(E,w),a&&r.fog===!0&&Je.refreshFogUniforms(E,a),Je.refreshMaterialUniforms(E,r,be,ye,j.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}il.upload(P,Ot(v),E,Ve)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(il.upload(P,Ot(v),E,Ve),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(P,`center`,i.center),T.setValue(P,`modelViewMatrix`,i.modelViewMatrix),T.setValue(P,`normalMatrix`,i.normalMatrix),T.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ct.update(n,x),ct.bind(n,x)}}return x}function jt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ce},this.getActiveMipmapLevel=function(){return le},this.getRenderTarget=function(){return ue},this.setRenderTargetTextures=function(e,t,n){let r=ze.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),ze.get(e.texture).__webglTexture=t,ze.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=ze.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){ue=e,ce=t,le=n;let r=null,i=!1,a=!1;if(e){let o=ze.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest,F.viewport(pe),F.scissor(me),F.setScissorTest(he),de=-1;return}if(o.__webglFramebuffer===void 0)Ve.setupRenderTarget(e);else if(o.__hasExternalTextures)Ve.rebindTextures(e,ze.get(e.texture).__webglTexture,ze.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&ze.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ve.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=ze.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ve.useMultisampledRTT(e)===!1?ze.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest}else pe.copy(Ce).multiplyScalar(be).floor(),me.copy(we).multiplyScalar(be).floor(),he=Te;if(n!==0&&(r=ae),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(pe),F.scissor(me),F.setScissorTest(he),i){let r=ze.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=ze.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=ze.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}de=-1};function Nt(e){let t=ze.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Le.textureFormatReadable(e.format),t.__typeReadable=Le.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=ze.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=Nt(o);if(u.__formatReadable===!1){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,ot.convert(c),ot.convert(l),a)}finally{let e=ue===null?null:ze.get(ue).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=ze.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=Nt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,ot.convert(l),ot.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=ue===null?null:ze.get(ue).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await nt(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ve.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ot.convert(t.format),_=ot.convert(t.type),v;t.isData3DTexture?(Ve.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ve.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(Ve.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=ze.get(e),r=ze.get(t),h=ze.get(n.__renderTarget),g=ze.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ze.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ze.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||ze.has(e)){let n=ze.get(e),r=ze.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,oe),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,se);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){ze.get(e).__webglFramebuffer===void 0&&Ve.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ve.setTextureCube(e,0):e.isData3DTexture?Ve.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ve.setTexture2DArray(e,0):Ve.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){ce=0,le=0,ue=null,F.reset(),st.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return qe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=zt._getDrawingBufferColorSpace(e),t.unpackColorSpace=zt._getUnpackColorSpace()}},Du={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Ou=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},ku=new Fo(-1,1,1,-1,0,1),Au=new class extends Mr{constructor(){super(),this.setAttribute(`position`,new H([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new H([0,2,0,0,2,0],2))}},ju=class{constructor(e){this._mesh=new ni(Au,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ku)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Mu=class extends Ou{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof qa?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Wa.clone(e.uniforms),this.material=new qa({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ju(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Nu=class extends Ou{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Pu=class extends Ou{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Fu=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new z);this._width=n.width,this._height=n.height,t=new Qt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:g}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Mu(Du),this.copyPass.material.blending=0,this.timer=new Uo}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Nu!==void 0&&(r instanceof Nu?n=!0:r instanceof Pu&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new z);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Iu=class extends Ou{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new V}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Lu={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new V(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Ru=class e extends Ou{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new z(256,256):new z(e.x,e.y),this.clearColor=new V(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Qt(i,a,{type:g,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Qt(i,a,{type:g,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Qt(i,a,{type:g,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Lu;this.highPassUniforms=Wa.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new qa({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new z(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Wa.clone(Du.uniforms),this.blendMaterial=new qa({uniforms:this.copyUniforms,vertexShader:Du.vertexShader,fragmentShader:Du.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new V,this._oldClearAlpha=1,this._basic=new Wr,this._fsQuad=new ju(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new z(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new qa({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new z(.5,.5)},direction:{value:new z(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new qa({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Ru.BlurDirectionX=new z(1,0),Ru.BlurDirectionY=new z(0,1);var zu={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Bu=class extends Ou{constructor(){super(),this.isOutputPass=!0,this.uniforms=Wa.clone(zu.uniforms),this.material=new Ja({name:zu.name,uniforms:this.uniforms,vertexShader:zu.vertexShader,fragmentShader:zu.fragmentShader}),this._fsQuad=new ju(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},zt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Vu={name:`SMAAEdgesShader`,defines:{SMAA_THRESHOLD:`0.1`},uniforms:{tDiffuse:{value:null},resolution:{value:new z(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},Hu={name:`SMAAWeightsShader`,defines:{SMAA_MAX_SEARCH_STEPS:`8`,SMAA_AREATEX_MAX_DISTANCE:`16`,SMAA_AREATEX_PIXEL_SIZE:`( 1.0 / vec2( 160.0, 560.0 ) )`,SMAA_AREATEX_SUBTEX_SIZE:`( 1.0 / 7.0 )`},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new z(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Uu={name:`SMAABlendShader`,uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new z(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`},Wu=class extends Ou{constructor(){super(),this._edgesRT=new Qt(1,1,{depthBuffer:!1,type:g}),this._edgesRT.texture.name=`SMAAPass.edges`,this._weightsRT=new Qt(1,1,{depthBuffer:!1,type:g}),this._weightsRT.texture.name=`SMAAPass.weights`;let e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new Yt,this._areaTexture.name=`SMAAPass.area`,this._areaTexture.image=t,this._areaTexture.minFilter=o,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;let n=new Image;n.src=this._getSearchTexture(),n.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new Yt,this._searchTexture.name=`SMAAPass.search`,this._searchTexture.image=n,this._searchTexture.magFilter=r,this._searchTexture.minFilter=r,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=Wa.clone(Vu.uniforms),this._materialEdges=new qa({defines:Object.assign({},Vu.defines),uniforms:this._uniformsEdges,vertexShader:Vu.vertexShader,fragmentShader:Vu.fragmentShader}),this._uniformsWeights=Wa.clone(Hu.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new qa({defines:Object.assign({},Hu.defines),uniforms:this._uniformsWeights,vertexShader:Hu.vertexShader,fragmentShader:Hu.fragmentShader}),this._uniformsBlend=Wa.clone(Uu.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new qa({uniforms:this._uniformsBlend,vertexShader:Uu.vertexShader,fragmentShader:Uu.fragmentShader}),this._fsQuad=new ju(null)}render(e,t,n){this._uniformsEdges.tDiffuse.value=n.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=n.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return`data:image/png;base64,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`}_getSearchTexture(){return`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII=`}},Gu={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:new z(1,1)},uShock:{value:[new Xt,new Xt,new Xt,new Xt]},uDamage:{value:0},uDesat:{value:0},uLift:{value:new B(.012,.01,.02)},uGain:{value:new B(1.03,1,.97)},uContrast:{value:1.08},uSat:{value:1.12},uVignette:{value:.32},uCA:{value:7e-4},uGrain:{value:.018},uFlash:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uTime, uDamage, uDesat, uContrast, uSat, uVignette, uCA, uGrain, uFlash;
    uniform vec2 uRes; uniform vec4 uShock[4]; uniform vec3 uLift, uGain;
    varying vec2 vUv;
    float rnd(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + uTime * 7.13) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      float aspect = uRes.x / uRes.y;
      // Shockwave ring distortion
      for (int i = 0; i < 4; i++) {
        vec4 s = uShock[i];
        if (s.w <= 0.0) continue;
        vec2 d = uv - s.xy; d.x *= aspect;
        float r = length(d);
        float band = 1.0 - smoothstep(0.0, 0.035, abs(r - s.z));
        uv -= normalize(d + 1e-5) * band * s.w * 0.02 * vec2(1.0 / aspect, 1.0);
      }
      vec2 c = uv - 0.5;
      float edge = dot(c, c);
      vec2 off = c * uCA * (1.0 + edge * 6.0);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;
      // Grade: lift/gain, contrast around mid grey, saturation
      col = col * uGain + uLift * (1.0 - col);
      col = (col - 0.5) * uContrast + 0.5;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSat * (1.0 - uDesat));
      // Vignette
      float v = smoothstep(0.85, 0.2, length(c * vec2(aspect * 0.8, 1.0)));
      col *= mix(1.0 - uVignette, 1.0, v);
      // Damage vignette
      float dv = smoothstep(0.25, 0.9, length(c * vec2(aspect * 0.7, 1.0)));
      col = mix(col, vec3(0.55, 0.02, 0.02), dv * uDamage * 0.65);
      col += uFlash;
      col += (rnd(uv * uRes) - 0.5) * uGrain;
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`},Ku={uniforms:{tDiffuse:{value:null},uSun:{value:new z(.5,.5)},uStrength:{value:0},uTint:{value:new V(1,.8,.6)}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uStrength; uniform vec3 uTint; varying vec2 vUv;
    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      if (uStrength <= 0.001) { gl_FragColor = base; return; }
      vec2 delta = (vUv - uSun) * (1.0 / 56.0) * 0.9;
      vec2 uv = vUv;
      float decay = 1.0, acc = 0.0;
      for (int i = 0; i < 56; i++) {
        uv -= delta;
        vec3 c = texture2D(tDiffuse, clamp(uv, 0.0, 1.0)).rgb;
        float l = max(dot(c, vec3(0.299, 0.587, 0.114)) - 1.1, 0.0);
        acc += l * decay;
        decay *= 0.965;
      }
      float falloff = 1.0 - smoothstep(0.0, 1.2, length((vUv - uSun) * vec2(1.6, 1.0)));
      gl_FragColor = vec4(base.rgb + uTint * acc * uStrength * 0.018 * falloff, base.a);
    }`},qu={high:{pixelRatio:1.5,shadows:2048,bloom:!0,smaa:!0},medium:{pixelRatio:1,shadows:1024,bloom:!0,smaa:!0},low:{pixelRatio:.85,shadows:0,bloom:!1,smaa:!1}},Ju=class{constructor(e,t=`high`){this.q=qu[t]||qu.high;let n=new Eu({antialias:!1,powerPreference:`high-performance`,stencil:!1});n.setPixelRatio(Math.min(window.devicePixelRatio||1,this.q.pixelRatio)),n.setSize(window.innerWidth,window.innerHeight),n.toneMapping=4,n.toneMappingExposure=.9,n.outputColorSpace=Be,n.shadowMap.enabled=this.q.shadows>0,n.shadowMap.type=1,e.appendChild(n.domElement),this.gl=n,this.scene=new zn,this.scene.fog=new Rn(8956620,42e-5),this.camera=new Mo(40,window.innerWidth/window.innerHeight,1,12e3);let r=new Fu(n);r.addPass(new Iu(this.scene,this.camera)),this.bloom=new Ru(new z(window.innerWidth,window.innerHeight),.42,.5,1),this.bloom.enabled=this.q.bloom,r.addPass(this.bloom),this.rays=new Mu(Ku),this.rays.enabled=this.q.bloom,r.addPass(this.rays),r.addPass(new Bu),this.grade=new Mu(Gu),r.addPass(this.grade),this.q.smaa&&r.addPass(new Wu),this.composer=r,this.shocks=[],window.addEventListener(`resize`,()=>this.resize()),this.resize()}adapt(e){if(this.fixedRes||(this.ftAvg=this.ftAvg===void 0?e:this.ftAvg*.95+e*.05,this.adaptT=(this.adaptT||0)+e,this.adaptT<1.5))return;this.adaptT=0;let t=Math.min(window.devicePixelRatio||1,this.q.pixelRatio),n=this.gl.getPixelRatio(),r=n;this.ftAvg>1/48?r=Math.max(.5,n*.85):this.ftAvg<1/58&&n<t&&(r=Math.min(t,n*1.08)),Math.abs(r-n)>.02&&(this.gl.setPixelRatio(r),this.resize())}resize(){let e=window.innerWidth,t=window.innerHeight;this.gl.setSize(e,t),this.composer.setPixelRatio&&this.composer.setPixelRatio(this.gl.getPixelRatio()),this.composer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.grade.uniforms.uRes.value.set(e,t)}shockwave(e,t=1,n=.7){let r=e.clone().project(this.camera);r.z>1||Math.abs(r.x)>1.3||Math.abs(r.y)>1.3||(this.shocks.length>=4&&this.shocks.shift(),this.shocks.push({x:r.x*.5+.5,y:r.y*.5+.5,t:0,life:n,str:t}))}setSun(e,t,n=1){let r=this.camera.position.clone().addScaledVector(e,3e3).project(this.camera),i=this.rays.uniforms;i.uSun.value.set(r.x*.5+.5,r.y*.5+.5);let a=Math.max(Math.abs(r.x),Math.abs(r.y)),o=r.z<1?1-At.smoothstep(a,1,1.9):0;i.uStrength.value+=(o*n-i.uStrength.value)*.1,i.uTint.value.copy(t)}render(e,t){let n=this.grade.uniforms;n.uTime.value=t;for(let t=this.shocks.length-1;t>=0;t--){let n=this.shocks[t];n.t+=e,n.t>n.life&&this.shocks.splice(t,1)}for(let e=0;e<4;e++){let t=this.shocks[e];if(!t){n.uShock.value[e].w=0;continue}let r=t.t/t.life;n.uShock.value[e].set(t.x,t.y,r*.28*t.str,(1-r)*t.str)}n.uFlash.value=Math.max(0,n.uFlash.value-e*2.5),this.composer.render(e)}},Yu=[{t:0,elev:14,azim:128,sun:[1,.7,.46],sunI:2.6,zen:[.1,.2,.42],hor:[.9,.66,.52],fog:[.42,.46,.54],hemiSky:[.5,.55,.75],hemiGnd:[.18,.14,.12],exposure:.95,cloudLit:[1.25,.8,.6],cloudDark:[.3,.28,.38]},{t:.3,elev:32,azim:140,sun:[1,.9,.78],sunI:3.2,zen:[.08,.22,.52],hor:[.62,.74,.86],fog:[.42,.52,.62],hemiSky:[.55,.65,.85],hemiGnd:[.2,.18,.15],exposure:.85,cloudLit:[1.3,1.25,1.2],cloudDark:[.45,.5,.6]},{t:.62,elev:24,azim:200,sun:[1,.82,.6],sunI:3,zen:[.09,.2,.46],hor:[.78,.7,.66],fog:[.48,.52,.58],hemiSky:[.55,.6,.78],hemiGnd:[.2,.16,.13],exposure:.88,cloudLit:[1.35,1.1,.9],cloudDark:[.42,.4,.48]},{t:.85,elev:9,azim:238,sun:[1,.52,.26],sunI:2.6,zen:[.12,.14,.32],hor:[1,.5,.28],fog:[.55,.4,.38],hemiSky:[.5,.45,.6],hemiGnd:[.2,.12,.1],exposure:.95,cloudLit:[1.4,.7,.4],cloudDark:[.3,.2,.3]},{t:1,elev:2.5,azim:250,sun:[1,.36,.16],sunI:1.9,zen:[.07,.07,.2],hor:[.9,.32,.2],fog:[.42,.26,.28],hemiSky:[.35,.3,.5],hemiGnd:[.12,.08,.08],exposure:1.05,cloudLit:[1.2,.45,.28],cloudDark:[.18,.12,.22]}],Xu=.87,Zu=`
varying vec3 vDir;
void main() {
  vDir = normalize((modelMatrix * vec4(position, 0.0)).xyz);
  vec4 p = projectionMatrix * viewMatrix * vec4((modelMatrix * vec4(position, 1.0)).xyz, 1.0);
  gl_Position = p.xyww; // at far plane
}
`,Qu=`
uniform vec3 uSunDir, uSunColor, uZenith, uHorizon, uCloudLit, uCloudDark;
uniform float uTime, uSunI, uCloudMul;
varying vec3 vDir;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec3 d = normalize(vDir);
  float h = max(d.y, 0.0);
  float mu = dot(d, uSunDir);
  // Base gradient with a warm horizon band
  vec3 col = mix(uHorizon, uZenith, pow(h, 0.45));
  // Horizon haze toward the sun
  float sunSide = 0.5 + 0.5 * mu;
  col += uSunColor * pow(sunSide, 6.0) * (1.0 - h) * 0.55;
  // Mie glow + disk
  col += uSunColor * pow(max(mu, 0.0), 32.0) * 0.8 * uSunI * 0.25;
  col += uSunColor * pow(max(mu, 0.0), 420.0) * 3.0;
  col += uSunColor * smoothstep(0.99955, 0.99975, mu) * 40.0;

  // Clouds: project onto a plane
  if (d.y > 0.0) {
    vec2 uv = d.xz / (d.y + 0.12) * 1.3 + vec2(uTime * 0.004, uTime * 0.0015);
    float n = fbm(uv * 1.4);
    float cov = smoothstep(0.48, 0.78, n);
    float thick = smoothstep(0.5, 0.95, fbm(uv * 1.4 + 3.1));
    // Light from the sun: sample towards sun for self shadow
    float ns = fbm(uv * 1.4 + uSunDir.xz * 0.08);
    float lit = clamp(1.0 - (ns - n) * 5.0, 0.0, 1.0);
    vec3 cc = mix(uCloudDark, uCloudLit, lit * (1.0 - thick * 0.5));
    cc += uSunColor * pow(max(mu, 0.0), 12.0) * 1.5 * (1.0 - thick); // silver lining
    float fade = smoothstep(0.0, 0.18, d.y);
    col = mix(col, cc, cov * fade * 0.9 * uCloudMul);
  } else {
    col = mix(uHorizon * 0.6, uHorizon * 0.25, clamp(-d.y * 4.0, 0.0, 1.0));
  }
  gl_FragColor = vec4(col, 1.0);
}
`;function $u(e,t,n){return e.map((e,r)=>e+(t[r]-e)*n)}var ed=class{constructor(e,t){this.renderer=e,this.scene=t,this.uniforms={uSunDir:{value:new B(0,1,0)},uSunColor:{value:new V},uZenith:{value:new V},uHorizon:{value:new V},uCloudLit:{value:new V},uCloudDark:{value:new V},uTime:{value:0},uSunI:{value:1},uCloudMul:{value:1}};let n=new qa({uniforms:this.uniforms,vertexShader:Zu,fragmentShader:Qu,side:1,depthWrite:!1,fog:!1});this.dome=new ni(new La(1,48,24),n),this.dome.scale.setScalar(5e3),this.dome.frustumCulled=!1,this.dome.renderOrder=-10,t.add(this.dome),this.envScene=new zn;let r=new ni(this.dome.geometry,n);r.scale.setScalar(50),this.envScene.add(r),this.pmrem=new Ns(e),this.envRT=null,this.envTimer=0,this.sun=new Lo(16777215,3),this.sun.castShadow=!0;let i=this.sun.shadow.camera;i.left=-170,i.right=170,i.top=170,i.bottom=-170,i.near=10,i.far=900,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.6,this.sun.shadow.radius=3,t.add(this.sun,this.sun.target),this.hemi=new bo(8952251,3351057,.6),t.add(this.hemi),this.state={},this.fogColor=new V,this.setTime(0,0)}setTime(e,t){e=Math.min(Math.max(e,0),1);let n=0;for(;n<Yu.length-2&&e>Yu[n+1].t;)n++;let r=Yu[n],i=Yu[n+1],a=At.smoothstep(e,r.t,i.t),o={};for(let e of Object.keys(r))o[e]=Array.isArray(r[e])?$u(r[e],i[e],a):r[e]+(i[e]-r[e])*a;this.state=o;let s=At.degToRad(o.elev),c=At.degToRad(o.azim),l=new B(Math.cos(s)*Math.sin(c),Math.sin(s),Math.cos(s)*Math.cos(c)),u=this.uniforms;u.uSunDir.value.copy(l),u.uSunColor.value.setRGB(...o.sun),u.uZenith.value.setRGB(...o.zen),u.uHorizon.value.setRGB(...o.hor),u.uCloudLit.value.setRGB(...o.cloudLit),u.uCloudDark.value.setRGB(...o.cloudDark),u.uSunI.value=o.sunI,u.uTime.value=t,this.sunDir=l,this.sun.color.setRGB(...o.sun),this.sun.intensity=o.sunI,this.hemi.color.setRGB(...o.hemiSky),this.hemi.groundColor.setRGB(...o.hemiGnd),this.hemi.intensity=.55,this.fogColor.setRGB(...o.fog),this.scene.fog&&this.scene.fog.color.copy(this.fogColor),this.exposure=o.exposure}follow(e,t){let n=this.sunDir;this.sun.position.set(e+n.x*400,n.y*400+20,t+n.z*400),this.sun.target.position.set(e,0,t),this.sun.target.updateMatrixWorld()}updateEnv(e,t=!1){if(this.envTimer-=e,!t&&this.envTimer>0)return;this.envTimer=4;let n=this.envRT;this.uniforms.uCloudMul.value=.35,this.envRT=this.pmrem.fromScene(this.envScene,0,.1,200),this.uniforms.uCloudMul.value=1,this.scene.environment=this.envRT.texture,n&&n.dispose()}},td=9.81,nd=[[.86,.5,71,.9,.5],[.52,.85,47,.55,.5],[.99,.12,33,.38,.55],[-.62,.78,23,.26,.6],[.71,-.7,16.5,.17,.6],[.2,.98,11.3,.1,.55],[-.9,-.43,7.9,.06,.5]],rd=nd.length,id=nd.map(([e,t,n,r,i])=>{let a=Math.hypot(e,t),o=2*Math.PI/n;return{dx:e/a,dz:t/a,k:o,A:r,w:Math.sqrt(td*o)*.55,Q:i/(o*r*rd)}}),ad={uWaveAmp:{value:1}};function od(e,t,n,r={y:0,nx:0,ny:1,nz:0}){let i=e,a=t;for(let r=0;r<2;r++){let r=0,o=0,s=ad.uWaveAmp.value;for(let e=0;e<rd;e++){let t=id[e],c=Math.cos(t.k*(t.dx*i+t.dz*a)-t.w*n);r+=t.Q*t.A*t.dx*c*s,o+=t.Q*t.A*t.dz*c*s}i=e-r,a=t-o}let o=0,s=0,c=1,l=0,u=ad.uWaveAmp.value;for(let e=0;e<rd;e++){let t=id[e],r=t.k*(t.dx*i+t.dz*a)-t.w*n,d=Math.sin(r),f=Math.cos(r);o+=t.A*d*u;let p=t.k*t.A*u;s-=t.dx*p*f,l-=t.dz*p*f,c-=t.Q*p*d}let d=Math.hypot(s,c,l);return r.y=o,r.nx=s/d,r.ny=c/d,r.nz=l/d,r}var sd=e=>e.toFixed(6),cd=`
uniform float uWaveAmp;
vec3 gerstnerWave(vec2 xz, float t, inout vec3 nrm) {
  vec3 d = vec3(0.0);
  float A = uWaveAmp;
${id.map(e=>`  {
    vec2 D = vec2(${sd(e.dx)}, ${sd(e.dz)});
    float ph = ${sd(e.k)} * dot(D, xz) - ${sd(e.w)} * t;
    float s = sin(ph); float c = cos(ph);
    d.x += ${sd(e.Q*e.A)} * A * D.x * c;
    d.z += ${sd(e.Q*e.A)} * A * D.y * c;
    d.y += ${sd(e.A)} * A * s;
    nrm.x -= D.x * ${sd(e.k*e.A)} * A * c;
    nrm.z -= D.y * ${sd(e.k*e.A)} * A * c;
    nrm.y -= ${sd(e.Q*e.k*e.A)} * A * s;
  }`).join(`
`)}
  return d;
}
`,ld={uCloudT:{value:0},uCloudAmt:{value:.5}},ud=`
uniform float uCloudT; uniform float uCloudAmt;
float csHash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float csNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(csHash(i), csHash(i + vec2(1, 0)), u.x), mix(csHash(i + vec2(0, 1)), csHash(i + vec2(1, 1)), u.x), u.y);
}
float cloudShadow(vec2 xz) {
  vec2 p = xz * 0.0042 + vec2(uCloudT * 0.011, uCloudT * 0.004);
  float n = csNoise(p) * 0.55 + csNoise(p * 2.1 + 5.3) * 0.3 + csNoise(p * 4.3 - 2.1) * 0.15;
  return 1.0 - smoothstep(0.48, 0.72, n) * uCloudAmt;
}
`;function dd(e){if(e.userData.cloudPatched)return e;e.userData.cloudPatched=!0;let t=e.onBeforeCompile;e.onBeforeCompile=(e,n)=>{t&&t(e,n),Object.assign(e.uniforms,ld),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vCloudW;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
{
  vec4 cw = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  cw = instanceMatrix * cw;
  #endif
  vCloudW = (modelMatrix * cw).xz;
}`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nvarying vec2 vCloudW;\n${ud}`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
{
  float cs = cloudShadow(vCloudW);
  reflectedLight.directDiffuse *= cs;
  reflectedLight.directSpecular *= cs;
}`)};let n=e.customProgramCacheKey?e.customProgramCacheKey.bind(e):()=>``;return e.customProgramCacheKey=()=>n()+`|cloud`,e.needsUpdate=!0,e}var fd=48,pd=`
float oHash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float oNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(oHash(i), oHash(i + vec2(1, 0)), u.x), mix(oHash(i + vec2(0, 1)), oHash(i + vec2(1, 1)), u.x), u.y);
}
float oFbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * oNoise(p); p = p * 2.07 + 13.1; a *= 0.5; }
  return v;
}
`;function md(e=300,t=3200){let n=e+1,r=new Float32Array(n*n*3),i=e=>t*(.07*e+.93*e*e*e);for(let t=0;t<n;t++){let a=i(t/e*2-1);for(let o=0;o<n;o++){let s=o/e*2-1,c=(t*n+o)*3;r[c]=i(s),r[c+1]=0,r[c+2]=a}}let a=new Uint32Array(e*e*6),o=0;for(let t=0;t<e;t++)for(let r=0;r<e;r++){let e=t*n+r,i=e+1,s=e+n,c=s+1;a[o++]=e,a[o++]=s,a[o++]=i,a[o++]=i,a[o++]=s,a[o++]=c}let s=new Mr;s.setAttribute(`position`,new vr(r,3));let c=new Float32Array(n*n*3);for(let e=1;e<c.length;e+=3)c[e]=1;return s.setAttribute(`normal`,new vr(c,3)),s.setIndex(new vr(a,1)),s.boundingSphere=new wr(new B,t*1.5),s}var hd=class{constructor(e){this.uniforms={uTime:{value:0},uIslands:{value:Array.from({length:fd},()=>new Xt(1e5,1e5,0,0))},uIslandCount:{value:0},uSunDir:{value:new B(0,1,0)},uSunColor:{value:new V(1,1,1)},uDeep:{value:new V(.004,.022,.04)},uShallow:{value:new V(.02,.2,.2)},uSSS:{value:new V(.03,.2,.17)},uBodyI:{value:1}};let t=new Ya({color:16777215,roughness:.06,metalness:0,envMapIntensity:1}),n=this.uniforms;t.onBeforeCompile=e=>{Object.assign(e.uniforms,n,ad),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uTime;
varying vec3 vOW; varying float vWaveH; varying vec2 vGrid;
${cd}`).replace(`#include <beginnormal_vertex>`,`
vec3 wpos0 = (modelMatrix * vec4(position, 1.0)).xyz;
vec3 gN = vec3(0.0, 1.0, 0.0);
vec3 gD = gerstnerWave(wpos0.xz, uTime, gN);
vec3 objectNormal = normalize(gN);
#ifdef USE_TANGENT
vec3 objectTangent = vec3(1.0, 0.0, 0.0);
#endif`).replace(`#include <begin_vertex>`,`
vec3 transformed = position + gD;
vWaveH = gD.y; vGrid = wpos0.xz; vOW = wpos0 + gD;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uTime; uniform vec4 uIslands[${fd}]; uniform int uIslandCount;
uniform vec3 uSunDir, uSunColor, uDeep, uShallow, uSSS; uniform float uBodyI;
varying vec3 vOW; varying float vWaveH; varying vec2 vGrid;
${cd}
${pd}`).replace(`#include <color_fragment>`,`#include <color_fragment>
// --- per-pixel wave normal
vec3 wN = vec3(0.0, 1.0, 0.0);
gerstnerWave(vGrid, uTime, wN);
float camDist = length(cameraPosition - vOW);
float detailFade = 1.0 - smoothstep(180.0, 900.0, camDist);
// high-frequency detail ripples (normal only): golden-angle directions avoid grid-like interference
for (int i = 0; i < 10; i++) {
  float fi = float(i);
  float ang = fi * 2.39996 + 0.7;
  vec2 D = vec2(cos(ang), sin(ang));
  float L = 7.5 * pow(0.78, fi);
  float k = 6.2831 / L;
  float ph = k * dot(D, vOW.xz) - sqrt(9.81 * k) * 0.75 * uTime + fi * 1.93;
  float slope = 0.3 * (L * 0.03) * k * detailFade * (0.6 + 0.4 * sin(fi * 3.1 + uTime * 0.3));
  wN.xz -= D * slope * cos(ph) * 0.35;
}
wN = normalize(wN);
vec3 V = normalize(cameraPosition - vOW);

// --- islands: shore distance
float shoreD = 1e4;
for (int i = 0; i < ${fd}; i++) {
  if (i >= uIslandCount) break;
  vec4 isl = uIslands[i];
  shoreD = min(shoreD, length(vOW.xz - isl.xy) - isl.z);
}
float n1 = oFbm(vOW.xz * 0.12 + vec2(uTime * 0.05, -uTime * 0.03));
float n2 = oFbm(vOW.xz * 0.45 - vec2(uTime * 0.11, uTime * 0.07));
float shallow = 1.0 - smoothstep(0.0, 34.0, shoreD);
float shoreFoam = (1.0 - smoothstep(0.0, 3.5 + n1 * 4.0, shoreD));
shoreFoam *= smoothstep(0.35, 0.75, 0.5 + 0.5 * sin(shoreD * 0.9 - uTime * 1.6 + n1 * 6.0) + n2 * 0.4);
shoreFoam = max(shoreFoam * 0.85, (1.0 - smoothstep(0.0, 1.4, shoreD)) * smoothstep(0.3, 0.6, n2 + 0.2));
float crest = smoothstep(1.15, 2.2, vWaveH + n1 * 0.9) * smoothstep(0.5, 0.85, n2) * 0.7;
float foam = clamp(shoreFoam + crest * 0.8, 0.0, 1.0);
vec3 waterAlbedo = mix(uDeep, uShallow * 0.6, shallow * 0.8);
diffuseColor.rgb = mix(waterAlbedo, vec3(0.92, 0.95, 0.97), foam);
`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
roughnessFactor = mix(0.075 + (1.0 - detailFade) * 0.12, 0.85, foam);`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
normal = normalize((viewMatrix * vec4(wN, 0.0)).xyz);`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
// Subsurface scattering: light through wave crests toward the viewer
float sunUp = clamp(uSunDir.y * 3.0, 0.0, 1.0);
vec2 sunH = normalize(uSunDir.xz + 1e-4);
float back = pow(clamp(dot(-V.xz, sunH) * 0.5 + 0.5, 0.0, 1.0), 3.0);
float thick = clamp(vWaveH * 0.55 + 0.45, 0.0, 1.4);
vec3 sss = uSSS * uSunColor * (0.25 + back * 1.4) * thick * sunUp * (1.0 - foam);
sss += uShallow * uSunColor * shallow * 0.18 * sunUp;
totalEmissiveRadiance += sss * (0.35 + 0.65 * pow(1.0 - max(dot(wN, V), 0.0), 2.0));
// Water-body scattering: seen from above the sea is lit from within, not by reflection.
float facing = max(dot(wN, V), 0.0);
vec3 body = vec3(0.006, 0.042, 0.058) * (0.45 + 0.9 * sunUp) * (0.6 + 0.4 * facing) * uBodyI;
body = mix(body, uShallow * 0.35, shallow * 0.6);
totalEmissiveRadiance += body * (1.0 - foam);`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
reflectedLight.directSpecular *= 0.45; // soften the sun road so combat stays readable`).replace(`#include <opaque_fragment>`,`#include <opaque_fragment>
gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(2.2)); // tame sun-glint fireflies before bloom`)},t.customProgramCacheKey=()=>`ocean-v2`,dd(t),this.material=t,this.mesh=new ni(md(),t),this.mesh.receiveShadow=!0,this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1,e.add(this.mesh),this.decals=new _d(e,n)}setIslands(e){this.islands=e,this.cullT=0}cullIslands(e,t){let n=this.islands||[],r=this.uniforms.uIslands.value,i=0;for(let a of n){if(i>=fd)break;Math.abs(a.x-e)>460+a.r||Math.abs(a.z-t)>380+a.r||r[i++].set(a.x,a.z,a.r,0)}this.uniforms.uIslandCount.value=i}update(e,t,n,r,i){this.uniforms.uTime.value=t,this.cullT=(this.cullT||0)-e,this.cullT<=0&&(this.cullT=.25,this.cullIslands(n,r)),this.mesh.position.set(Math.round(n/4)*4,0,Math.round(r/4)*4),i&&(this.uniforms.uSunDir.value.copy(i.sunDir),this.uniforms.uSunColor.value.copy(i.sun.color).multiplyScalar(i.sun.intensity*.45),this.uniforms.uBodyI.value=Math.min(1.2,.25+i.sun.intensity/3.4)),this.decals.update(e,t)}},gd=2400,_d=class{constructor(e,t){let n=new Fa(1,1,2,2);n.rotateX(-Math.PI/2),this.a0=new Float32Array(gd*4),this.a1=new Float32Array(gd*4);let r=new Ro;r.index=n.index,r.attributes.position=n.attributes.position,r.attributes.uv=n.attributes.uv,this.attr0=new oi(this.a0,4).setUsage(Ke),this.attr1=new oi(this.a1,4).setUsage(Ke),r.setAttribute(`aD0`,this.attr0),r.setAttribute(`aD1`,this.attr1),r.instanceCount=0,this.geo=r;let i=new qa({uniforms:{uTime:t.uTime,...ad},vertexShader:`
        uniform float uTime;
        attribute vec4 aD0; attribute vec4 aD1;
        varying vec2 vUv; varying vec4 vD1;
        ${cd}
        void main() {
          vUv = uv; vD1 = aD1;
          float s = aD0.w * (1.0 + aD1.w * aD1.x);
          float c = cos(aD0.z), sn = sin(aD0.z);
          vec2 lp = vec2(position.x * c - position.z * sn, position.x * sn + position.z * c) * s;
          vec2 wp = aD0.xy + lp;
          vec3 n = vec3(0.0, 1.0, 0.0);
          vec3 d = gerstnerWave(wp, uTime, n);
          vec3 p = vec3(wp.x, 0.12, wp.y) + d;
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,fragmentShader:`
        varying vec2 vUv; varying vec4 vD1;
        float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        float nz(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
          return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y); }
        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float r = length(p);
          float age = vD1.x; float kind = vD1.y;
          float n = nz(vUv * 7.0 + vD1.z * 13.0) * 0.6 + nz(vUv * 17.0) * 0.4;
          float a;
          if (kind < 0.5) {         // foam blob
            a = smoothstep(1.0, 0.25, r + n * 0.45) * smoothstep(0.25, 0.55, n + (1.0 - age) * 0.5);
          } else if (kind < 1.5) {  // expanding ring
            float ring = 1.0 - abs(r - 0.72) * 4.5;
            a = clamp(ring, 0.0, 1.0) * (0.5 + n * 0.7);
          } else {                  // dark scorch / oil slick
            a = smoothstep(1.0, 0.1, r + n * 0.5) * 0.8;
            gl_FragColor = vec4(vec3(0.02, 0.018, 0.016), a * vD1.z * (1.0 - age));
            return;
          }
          a *= vD1.z * (1.0 - age) * (1.0 - age * 0.3);
          gl_FragColor = vec4(vec3(0.9, 0.95, 0.98), a);
        }`,transparent:!0,depthWrite:!1});this.mesh=new ni(r,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1,e.add(this.mesh),this.life=new Float32Array(gd),this.age=new Float32Array(gd),this.count=0}add(e,t,n,r,i=0,a=1,o=1,s=Math.random()*6.28){let c;c=this.count<gd?this.count++:Math.random()*gd|0;let l=c*4;this.a0[l]=e,this.a0[l+1]=t,this.a0[l+2]=s,this.a0[l+3]=n,this.a1[l]=0,this.a1[l+1]=i,this.a1[l+2]=a,this.a1[l+3]=o,this.life[c]=r,this.age[c]=0}update(e){let t=this.count;for(let n=0;n<t;n++){this.age[n]+=e;let r=this.age[n]/this.life[n];if(r>=1){t--,n!==t&&(this.a0.copyWithin(n*4,t*4,t*4+4),this.a1.copyWithin(n*4,t*4,t*4+4),this.life[n]=this.life[t],this.age[n]=this.age[t],n--);continue}this.a1[n*4]=r}this.count=t,this.geo.instanceCount=t,this.attr0.needsUpdate=!0,this.attr1.needsUpdate=!0,this.attr0.addUpdateRange(0,t*4),this.attr1.addUpdateRange(0,t*4)}};function vd(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Mr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=yd(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=yd(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function yd(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new vr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function bd(e){let t=e*2654435761>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function xd(e,t,n){let r=Math.sin(e*127.1+t*311.7+n*74.7)*43758.5453;return r-Math.floor(r)}function Sd(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=a*a*(3-2*a),c=o*o*(3-2*o),l=xd(r,i,n),u=xd(r+1,i,n),d=xd(r,i+1,n),f=xd(r+1,i+1,n);return l+(u-l)*s+(d-l)*c+(l-u-d+f)*s*c}function Cd(e,t,n,r=5){let i=0,a=.5;for(let o=0;o<r;o++)i+=a*Sd(e,t,n+o*17),e*=2.03,t*=2.03,a*=.5;return i}var wd={wetSand:new V(.2,.17,.12),sand:new V(.48,.4,.27),grass:new V(.16,.28,.08),jungle:new V(.07,.18,.05),rock:new V(.34,.32,.3),rockDark:new V(.18,.17,.17),moss:new V(.2,.28,.14)},Td={jungle:{h:7,cliff:.5,green:1},rock:{h:4,cliff:.8,green:.3},edge:{h:8,cliff:.7,green:.7},harbor:{h:7,cliff:.6,green:.6},islet:{h:6,cliff:.7,green:.3}};function Ed(e,t=`jungle`,n=1){let r=Td[t]||Td.jungle,i=Math.max(14,Math.round(e/2.2)),a=Math.max(40,Math.round(e*2)),o=e*1.25,s=[],c=[],l=[],u=r.h*(.8+.4*xd(n,1,3))*Math.min(1.4,.6+e/60),d=(t,i)=>{let a=Math.atan2(i,t),o=1+(Cd(Math.cos(a)*1.3+n,Math.sin(a)*1.3,n,3)-.5)*.35,s=Math.hypot(t,i)/(e*o),c=Cd(t/14+n*3,i/14,n),l=1-Math.abs(Cd(t/22,i/22+n,n+5)*2-1),d=Math.max(0,1-s*s);d**=1-r.cliff*.6;let f=u*d*(.6+.6*c+.35*l);return f+=(1-At.smoothstep(s,.9,1.04))*1.1-2.6*At.smoothstep(s,.98,1.12),f};s.push(0,d(0,0),0);for(let e=1;e<=i;e++){let t=e/i*o;for(let n=0;n<a;n++){let r=n/a*Math.PI*2+e%2*(Math.PI/a),i=Math.cos(r)*t,o=Math.sin(r)*t;s.push(i,d(i,o),o)}}for(let e=0;e<a;e++)l.push(0,1+(e+1)%a,1+e);for(let e=1;e<i;e++){let t=1+(e-1)*a,n=1+e*a;for(let r=0;r<a;r++){let i=(r+1)%a,o=t+r,s=t+i,c=n+r,u=n+i;e%2?l.push(o,s,u,o,u,c):l.push(o,s,c,s,u,c)}}let f=new Mr;f.setAttribute(`position`,new H(s,3)),f.setIndex(l),f.computeVertexNormals();let p=f.attributes.normal,m=new V;for(let e=0;e<s.length/3;e++){let t=s[e*3],i=s[e*3+1],a=s[e*3+2],o=1-p.getY(e),l=Cd(t/6,a/6,n+9,3);if(i<.4)m.copy(wd.wetSand);else if(i<1.8+l*1.5)m.copy(wd.sand);else{let e=r.green*(1-At.smoothstep(o,.25,.55));m.copy(wd.rock).lerp(wd.rockDark,l);let t=wd.grass.clone().lerp(wd.jungle,At.smoothstep(i/u,.1,.6));m.lerp(t,e*(.75+l*.25)),o>.5&&m.lerp(wd.moss,.15)}m.multiplyScalar(.85+l*.3),c.push(m.r,m.g,m.b)}return f.setAttribute(`color`,new H(c,3)),{geometry:f,heightAt:d,H:u}}function Dd(){let e=new Ki(.35,.55,5,6);e.translate(0,2.5,0);let t=[];for(let e=0;e<3;e++){let n=new Ma(2.2-e*.45,2);n.scale(1,.8,1),n.translate((e-1)*.5,5+e*1.7,e%2*.4),t.push(n)}let n=vd(t),r=n.attributes.position;for(let e=0;e<r.count;e++){let t=1+(xd(r.getX(e)*3,r.getZ(e)*3,r.getY(e))-.5)*.35;r.setXYZ(e,r.getX(e)*t,r.getY(e),r.getZ(e)*t)}return n.computeVertexNormals(),{trunk:e,crown:n}}function Od(){let e=[],t=[],n=0,r=new Wi(9,1.5,9);r.translate(0,.75,0),e.push(r),n=1.5;for(let r=0;r<4;r++){let i=6-r*1.1,a=3.2-r*.35,o=new Wi(i,a,i);o.translate(0,n+a/2,0),e.push(o),n+=a;let s=new Ki(i*.35,i*1.05,1.4,4,1);s.rotateY(Math.PI/4);let c=s.attributes.position;for(let e=0;e<c.count;e++){let t=c.getX(e),n=c.getZ(e),r=c.getY(e),a=Math.hypot(t,n);r<0&&c.setY(e,r+(a/(i*1.05))**4*.9)}s.computeVertexNormals(),s.translate(0,n+.5,0),t.push(s),n+=1}let i=new qi(.35,3.5,6);return i.translate(0,n+1.7,0),e.push(i),{body:vd(e),roof:vd(t)}}function kd(){let e=[],t=new Ki(.5,.7,1.6,6);t.translate(0,.8,0),e.push(t);let n=new qi(1.1,.8,6);return n.translate(0,2.8,0),e.push(n),vd(e)}function Ad(e,t,n){let r=new Ki(e*.55,e,t,28,16,!1);r.translate(0,t/2-6,0);let i=r.attributes.position;for(let r=0;r<i.count;r++){let a=i.getX(r),o=i.getY(r),s=i.getZ(r),c=Math.atan2(s,a),l=(o+6)/t,u=Cd(Math.cos(c)*2+n,l*4,n,4),d=.75+u*.6;d*=1-(Math.max(0,l-.75)/.25)**2*.55,i.setXYZ(r,a*d,o+(l>.97?u*e*.2:0),s*d)}r.computeVertexNormals();let a=[];for(let e=0;e<i.count;e++){let n=(i.getY(e)+6)/t,o=r.attributes.normal.getY(e),s=new V(.42,.44,.42).lerp(new V(.14,.24,.12),At.smoothstep(o,.1,.5)*.9+(n>.85?.4:0));a.push(s.r,s.g,s.b)}return r.setAttribute(`color`,new H(a,3)),r}var jd=new V(.3,.315,.32),Md=new V(.13,.14,.145),Nd=new V(.08,.085,.08),Pd=new V(.07,.19,.05),Fd=new V(.2,.34,.08),Id=new V(.1,.1,.09);function Ld(e,t,n,r=0){let i=new Ki(1,1,1,36,26,!1);i.deleteAttribute(`uv`);let a=i.attributes.position,o=Math.cos(n*2.1)*r,s=Math.sin(n*2.1)*r;for(let r=0;r<a.count;r++){let i=a.getX(r),c=a.getY(r)+.5,l=a.getZ(r),u=Math.atan2(l,i),d=Math.cos(u),f=Math.sin(u),p=e*(1-.18*c+.12*Math.sin(c*3.1+n)),m=Math.max(0,(c-.65)/.35);p*=Math.sqrt(Math.max(0,1-m*m*.97)),p*=1-.14*Math.exp(-(((c*t-1.6)/1.2)**2));let h=Cd(d*2.2+n,f*2.2+c*1.5,n,4),g=Math.sin(c*t*.9+Cd(u*2,c*4,n+3,2)*3)*.5+.5;p*=.78+h*.45+g*.05;let _=c*t+(c>.98?(Cd(d*3,f*3,n+7,3)-.3)*e*.25:0),v=c*c;a.setXYZ(r,Math.cos(u)*p+o*v*t*.15,_-2.5,Math.sin(u)*p+s*v*t*.15)}i.computeVertexNormals();let c=i.attributes.normal,l=new Float32Array(a.count*3),u=new V;for(let e=0;e<a.count;e++){let r=a.getX(e),i=a.getY(e),o=a.getZ(e),s=(i+2.5)/t,d=c.getY(e),f=Cd(Math.atan2(o,r)*6+n,s*1.5,n+11,3);u.copy(jd).lerp(Md,At.smoothstep(f,.35,.75)),u.lerp(Nd,At.smoothstep(f,.62,.8)*.6);let p=Math.sin(s*t*.9)*.5+.5,m=At.smoothstep(d,.25,.6)*+(s>.15)+At.smoothstep(s,.8,.92)+(p>.85&&s>.3&&f<.5?.6:0),h=Pd.clone().lerp(Fd,Cd(r*.3,o*.3,n+5,3));u.lerp(h,Math.min(1,m)),i<1.2&&u.lerp(Id,.75*(1-At.smoothstep(i,-.5,1.2))),u.multiplyScalar(.85+Cd(r*.5,i*.8+o*.5,n+13,2)*.3),l[e*3]=u.r,l[e*3+1]=u.g,l[e*3+2]=u.b}return i.setAttribute(`color`,new vr(l,3)),{geometry:i,top:t-2.5-e*.05,topR:e*.45}}var Rd={jungle:{n:[4,6],r:[.16,.26],h:[34,52],spread:.6},edge:{n:[4,6],r:[.18,.3],h:[44,70],spread:.6},rock:{n:[2,3],r:[.3,.44],h:[24,40],spread:.45},harbor:{n:[1,2],r:[.24,.34],h:[16,26],spread:.4}},zd=class{constructor(e,t,n){this.group=new An,e.add(this.group);let r=new Ya({vertexColors:!0,roughness:.92,metalness:0}),i=new Ya({color:4863268,roughness:.9}),a=new Ya({color:16777215,roughness:.75}),o=new Ya({color:9077624,roughness:.85}),s=new Ya({color:2832954,roughness:.55,metalness:.2}),c=new Ya({color:0,emissive:16752704,emissiveIntensity:4});[r,i,a,o,s].forEach(dd);let{trunk:l,crown:u}=Dd(),d=[],f=[],p=[];for(let e of t){let t=e.kind===`edge`?`edge`:e.kind,n=Ed(e.r,t,e.seed||1),i=bd(e.seed*31+7),a=Rd[t],o=[n.geometry],s=[];if(a){let t=a.n[0]+Math.floor(i()*(a.n[1]-a.n[0]+1));for(let n=0;n<t;n++){let r=n/t*Math.PI*2+i()*1.2,c=n===0?i()*.12:a.spread*(.55+i()*.45),l=Ld(e.r*(a.r[0]+i()*(a.r[1]-a.r[0]))*(n===0?1.15:1),(a.h[0]+i()*(a.h[1]-a.h[0]))*(n===0?1:.75)*Math.min(1.2,.6+e.r/70),e.seed*10+n,i()*.6),u=Math.cos(r)*c*e.r,d=Math.sin(r)*c*e.r;l.geometry.translate(u,0,d),o.push(l.geometry),s.push({x:u,z:d,y:l.top,r:l.topR})}}n.geometry.attributes.uv&&n.geometry.deleteAttribute(`uv`);let c=new ni((o.length>1?vd(o.map(e=>e.index?e.toNonIndexed():e)):n.geometry)||n.geometry,r);c.position.set(e.x,0,e.z),c.castShadow=!0,c.receiveShadow=!0,this.group.add(c);let l=bd(e.seed*97+5);if(t===`jungle`||t===`edge`||t===`harbor`){let r=Math.round(e.r*e.r*.04*(t===`jungle`?1.4:.8));for(let t=0;t<r;t++){let t=l()*Math.PI*2,r=Math.sqrt(l())*e.r*.8,i=Math.cos(t)*r,a=Math.sin(t)*r,o=n.heightAt(i,a);o<2.5||d.push({x:e.x+i,y:o-.4,z:e.z+a,s:.5+l()*.6,r:l()*6.28})}}for(let t of s){let n=Math.round(t.r*t.r*.34)+5;for(let r=0;r<n;r++){let n=l()*6.28,r=Math.sqrt(l())*t.r*.9;d.push({x:e.x+t.x+Math.cos(n)*r,y:t.y-1.6-r*.3,z:e.z+t.z+Math.sin(n)*r,s:.55+l()*.55,r:l()*6.28})}}if(e._tops=s,t===`jungle`&&e.r>45){let t=l()*6.28,r=Math.cos(t)*e.r*.2,i=Math.sin(t)*e.r*.2,a=(e._tops||[]).slice().sort((e,t)=>t.y-e.y)[0];a?f.push({x:e.x+a.x,y:a.y-.6,z:e.z+a.z,r:l()*6.28,s:.9}):f.push({x:e.x+r,y:n.heightAt(r,i)-.8,z:e.z+i,r:l()*6.28});for(let r=0;r<4;r++){let i=t+(r-1.5)*.35,a=Math.cos(i)*e.r*.86,o=Math.sin(i)*e.r*.86;p.push({x:e.x+a,y:Math.max(.5,n.heightAt(a,o)),z:e.z+o})}}}let m=(e,t,n,r,i=!0)=>{if(!n.length)return null;let a=new mi(e,t,n.length),o=new tn,s=new jt,c=new B,l=new B;return n.forEach((e,t)=>{r(e,l,s,c),o.compose(l,s,c),a.setMatrixAt(t,o)}),a.castShadow=i,a.receiveShadow=!0,this.group.add(a),a},h=(e,t,n,r)=>{t.set(e.x,e.y,e.z),n.setFromAxisAngle(new B(0,1,0),e.r||0),r.setScalar(e.s||1)};m(l,i,d,h);let g=m(u,a,d,h);if(g){let e=new V;d.forEach((t,n)=>{e.setHSL(.21+xd(t.x,t.z,1)*.1,.55+xd(t.x,t.z,3)*.2,.13+xd(t.z,t.x,2)*.12),g.setColorAt(n,e)})}let _=Od();m(_.body,o,f,h),m(_.roof,s,f,h),m(kd(),o,p,h,!1);let v=new La(.45,8,6);v.translate(0,1.9,0),m(v,c,p,h,!1);let y=dd(new Ya({vertexColors:!0,roughness:.95}));for(let e of n){let t=bd(e.seed),n=3+Math.floor(t()*4);for(let r=0;r<n;r++){let n=new ni(Ad(e.r*(.25+t()*.3),e.h*(.5+t()*.8),e.seed*10+r),y);n.position.set(e.x+(t()-.5)*e.r*1.4,0,e.z+(t()-.5)*e.r*1.4),n.rotation.y=t()*6.28,this.group.add(n)}}}},Bd=`
attribute vec4 aColor; attribute vec2 aSK; // size, kind
varying vec4 vColor; varying float vKind; varying float vSeed;
uniform float uScale;
void main() {
  vColor = aColor; vKind = aSK.y; vSeed = fract(position.x * 0.137 + position.z * 0.311);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(aSK.x * uScale / -mv.z, 0.0, 512.0);
  gl_Position = projectionMatrix * mv;
}`,Vd=`
varying vec4 vColor; varying float vKind; varying float vSeed;
uniform vec3 uLight; uniform float uAdditive;
float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
float nz(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y); }
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r = length(p);
  if (r > 1.0) discard;
  float a;
  vec3 col = vColor.rgb;
  if (vKind < 0.5) {
    a = pow(1.0 - r, 2.2);
  } else if (vKind < 1.5) {
    float n = nz(p * 2.3 + vSeed * 17.0) * 0.55 + nz(p * 5.1 - vSeed * 9.0) * 0.45;
    a = smoothstep(1.0, 0.3, r + (n - 0.5) * 0.8);
    // fake lighting: brighter top-left
    float lit = 0.75 + 0.35 * (-p.y * 0.6 - p.x * 0.3) + n * 0.2;
    col *= lit;
  } else if (vKind < 2.5) {
    a = smoothstep(1.0, 0.0, r); a = a * a * a;
  } else if (vKind < 3.5) {
    float n = nz(p * 3.0 + vSeed * 31.0);
    a = smoothstep(1.0, 0.2, r + (n - 0.5) * 0.9) * (0.6 + n * 0.5);
  } else {
    float n = nz(vec2(p.x * 2.5, p.y * 1.5 + vSeed * 20.0));
    a = smoothstep(1.0, 0.1, r + (n - 0.5) * 1.1);
    col *= mix(vec3(1.0), vec3(1.6, 1.3, 0.8), 1.0 - r);
  }
  a *= vColor.a;
  if (a < 0.003) discard;
  if (uAdditive > 0.5) gl_FragColor = vec4(col, a);           // SrcAlpha, One
  else gl_FragColor = vec4(col * uLight * a, a);               // premultiplied over
}`,Hd=class{constructor(e,t,n){this.max=t,this.n=0,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.sk=new Float32Array(t*2),this.vel=new Float32Array(t*3),this.age=new Float32Array(t),this.life=new Float32Array(t),this.s0=new Float32Array(t),this.s1=new Float32Array(t),this.c0=new Float32Array(t*3),this.c1=new Float32Array(t*3),this.a0=new Float32Array(t),this.a1=new Float32Array(t),this.drag=new Float32Array(t),this.grav=new Float32Array(t);let r=new Mr;this.pAttr=new vr(this.pos,3).setUsage(Ke),this.cAttr=new vr(this.col,4).setUsage(Ke),this.sAttr=new vr(this.sk,2).setUsage(Ke),r.setAttribute(`position`,this.pAttr),r.setAttribute(`aColor`,this.cAttr),r.setAttribute(`aSK`,this.sAttr),r.setDrawRange(0,0),this.uniforms={uScale:{value:600},uLight:{value:new V(1,1,1)},uAdditive:{value:+!!n}};let i=new qa({uniforms:this.uniforms,vertexShader:Bd,fragmentShader:Vd,transparent:!0,depthWrite:!1,blending:n?2:1});n||(i.blending=5,i.blendSrc=201,i.blendDst=205),this.points=new Li(r,i),this.points.frustumCulled=!1,this.points.renderOrder=n?5:4,this.geo=r,e.add(this.points)}emit(e){let t;t=this.n<this.max?this.n++:Math.random()*this.max|0;let n=t*3;this.pos[n]=e.x,this.pos[n+1]=e.y,this.pos[n+2]=e.z,this.vel[n]=e.vx||0,this.vel[n+1]=e.vy||0,this.vel[n+2]=e.vz||0,this.age[t]=0,this.life[t]=e.life||1,this.s0[t]=e.s0??1,this.s1[t]=e.s1??this.s0[t],this.c0[n]=e.r??1,this.c0[n+1]=e.g??1,this.c0[n+2]=e.b??1,this.c1[n]=e.r1??this.c0[n],this.c1[n+1]=e.g1??this.c0[n+1],this.c1[n+2]=e.b1??this.c0[n+2],this.a0[t]=e.a0??1,this.a1[t]=e.a1??0,this.drag[t]=e.drag??0,this.grav[t]=e.grav??0,this.sk[t*2+1]=e.kind??0}update(e){let t=this.n,n=this.pos,r=this.vel;for(let i=0;i<t;i++){let a=this.age[i]+=e;if(a>=this.life[i]){t--,i!==t&&this.move(t,i),i--;continue}let o=i*3,s=a/this.life[i],c=Math.max(0,1-this.drag[i]*e);r[o]*=c,r[o+1]=r[o+1]*c-this.grav[i]*e,r[o+2]*=c,n[o]+=r[o]*e,n[o+1]+=r[o+1]*e,n[o+2]+=r[o+2]*e,this.grav[i]>0&&n[o+1]<-.5&&(this.age[i]=this.life[i]),this.sk[i*2]=this.s0[i]+(this.s1[i]-this.s0[i])*(1-(1-s)*(1-s));let l=i*4;this.col[l]=this.c0[o]+(this.c1[o]-this.c0[o])*s,this.col[l+1]=this.c0[o+1]+(this.c1[o+1]-this.c0[o+1])*s,this.col[l+2]=this.c0[o+2]+(this.c1[o+2]-this.c0[o+2])*s;let u=Math.min(1,s*12);this.col[l+3]=(this.a0[i]+(this.a1[i]-this.a0[i])*s)*u}this.n=t,this.geo.setDrawRange(0,t),this.pAttr.needsUpdate=this.cAttr.needsUpdate=this.sAttr.needsUpdate=!0}move(e,t){let n=e*3,r=t*3;for(let e=0;e<3;e++)this.pos[r+e]=this.pos[n+e],this.vel[r+e]=this.vel[n+e],this.c0[r+e]=this.c0[n+e],this.c1[r+e]=this.c1[n+e];this.col.copyWithin(t*4,e*4,e*4+4),this.sk[t*2]=this.sk[e*2],this.sk[t*2+1]=this.sk[e*2+1],this.age[t]=this.age[e],this.life[t]=this.life[e],this.s0[t]=this.s0[e],this.s1[t]=this.s1[e],this.a0[t]=this.a0[e],this.a1[t]=this.a1[e],this.drag[t]=this.drag[e],this.grav[t]=this.grav[e]}},Ud=class{constructor(e){this.add=new Hd(e,9e3,!0),this.alpha=new Hd(e,7e3,!1)}setScale(e){let t=e.gl.domElement.height/(2*Math.tan(At.degToRad(e.camera.fov/2)));this.add.uniforms.uScale.value=t,this.alpha.uniforms.uScale.value=t}setLight(e){this.alpha.uniforms.uLight.value.copy(e)}update(e){this.add.update(e),this.alpha.update(e)}},Wd=new B,Gd={y:0,nx:0,ny:1,nz:0},W=(e,t)=>e+Math.random()*(t-e),Kd=e=>new qa({uniforms:{uColor:{value:new V(e)},uK:{value:0},uAlpha:{value:1},uWidth:{value:.12}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 uColor; uniform float uK, uAlpha, uWidth; varying vec2 vUv;
    void main(){ float r = length(vUv * 2.0 - 1.0);
      float ring = 1.0 - smoothstep(0.0, uWidth, abs(r - 0.92));
      float fill = smoothstep(0.92, 0.0, r) * 0.12;
      float a = (ring + fill) * uAlpha * (1.0 - uK);
      if (r > 1.0) discard;
      gl_FragColor = vec4(uColor * a, a); }`,transparent:!0,depthWrite:!1,blending:2,side:2}),qd=()=>new qa({uniforms:{uColor:{value:new V},uAlpha:{value:1}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 uColor; uniform float uAlpha; varying vec2 vUv;
    void main(){ float d = abs(vUv.x - 0.5) * 2.0; float core = pow(1.0 - d, 6.0) * 3.0 + pow(1.0 - d, 1.5) * 0.6;
      float ends = smoothstep(0.0, 0.02, vUv.y) * smoothstep(1.0, 0.97, vUv.y);
      float a = core * uAlpha * ends; gl_FragColor = vec4(uColor * a + vec3(a * 0.35) * pow(1.0-d, 12.0), a); }`,transparent:!0,depthWrite:!1,blending:2,side:2}),Jd=class{constructor(e,t,n,r){this.scene=e,this.p=t,this.decals=n,this.renderer=r,this.time=0,this.onShake=null,this.lights=[];for(let t=0;t<8;t++){let t=new Po(16755302,0,60,1.6);t.userData={t:0,life:0,i0:0},e.add(t),this.lights.push(t)}this.lightIdx=0;let i=new Fa(2,2);i.rotateX(-Math.PI/2),this.rings=[];for(let t=0;t<32;t++){let t=new ni(i,Kd(16777215));t.visible=!1,t.renderOrder=6,t.frustumCulled=!1,t.userData={t:0,life:1,r0:1,r1:10},e.add(t),this.rings.push(t)}this.ringIdx=0;let a=new Fa(1,1);a.translate(0,.5,0),this.beams=[];for(let t=0;t<40;t++){let t=new An,n=qd(),r=new ni(a,n),i=new ni(a,n);i.rotation.y=Math.PI/2,t.add(r,i),t.visible=!1,t.userData={t:0,life:1,mat:n},r.frustumCulled=i.frustumCulled=!1,r.renderOrder=i.renderOrder=7,e.add(t),this.beams.push(t)}this.beamIdx=0,this.debrisMax=400;let o=new Wi(1,.35,.6),s=new Ya({color:2762018,roughness:.8,metalness:.3});this.debris=new mi(o,s,this.debrisMax),this.debris.instanceMatrix.setUsage(Ke),this.debris.count=0,this.debris.castShadow=!0,this.debris.frustumCulled=!1,e.add(this.debris),this.dState=[],this._m=new tn,this._q=new jt,this._e=new fn,this._s=new B}light(e,t,n,r,i){let a=this.lights[this.lightIdx++%this.lights.length];a.position.copy(e),a.position.y+=3,a.color.set(t),a.distance=r,a.userData.t=0,a.userData.life=i,a.userData.i0=n,a.intensity=n}ring(e,t,n,r,i,a=.6,o=.12,s=.6){let c=this.rings[this.ringIdx++%this.rings.length];return c.visible=!0,c.position.set(e,s,t),c.material.uniforms.uColor.value.set(i),c.material.uniforms.uWidth.value=o,Object.assign(c.userData,{t:0,life:a,r0:n,r1:r}),c.scale.setScalar(n),c}beam(e,t,n,r=1.5,i=.35){let a=this.beams[this.beamIdx++%this.beams.length];a.visible=!0,a.position.copy(e),Wd.subVectors(t,e);let o=Wd.length();return a.scale.set(r,o,r),a.quaternion.setFromUnitVectors(new B(0,1,0),Wd.normalize()),a.userData.mat.uniforms.uColor.value.set(n).multiplyScalar(2.2),a.userData.t=0,a.userData.life=i,a}shake(e,t,n){this.onShake&&this.onShake(e,t,n)}waterY(e,t){return od(e,t,this.time,Gd).y}muzzle(e,t,n=1,r=`ball`){let i=this.p,a=r===`ball`,o=r===`laser`||r===`pulse`?[.5,.9,1.6]:[2.4,1.5,.7];i.add.emit({x:e.x,y:e.y,z:e.z,life:.09,s0:6*n,s1:9*n,r:o[0],g:o[1],b:o[2],a0:1,a1:0,kind:0});for(let r=0;r<5;r++){let r=W(4,14)*n;i.add.emit({x:e.x,y:e.y,z:e.z,vx:t.x*r+W(-2,2),vy:t.y*r+W(0,2),vz:t.z*r+W(-2,2),life:W(.08,.18),s0:3.5*n,s1:1.5*n,r:o[0],g:o[1]*.9,b:o[2],a0:1,a1:0,kind:4,drag:5})}if(r===`laser`||r===`pulse`)return;let s=a?5:2;for(let r=0;r<s;r++){let r=W(3,11)*n,o=a?W(.7,.85):W(.3,.42);i.alpha.emit({x:e.x+t.x*2,y:e.y,z:e.z+t.z*2,vx:t.x*r+W(-1,1),vy:W(.5,2.5),vz:t.z*r+W(-1,1),life:W(1.2,a?3:1.6),s0:2.5*n,s1:W(6,10)*n*(a?1.3:.9),r:o,g:o,b:o*1.02,a0:a?.45:.28,a1:0,kind:1,drag:1.8})}n>1.2&&this.light(e,16756848,18*n,40*n,.12)}splash(e,t,n=1){let r=this.waterY(e,t),i=this.p,a=Math.round(14*n);for(let o=0;o<a;o++){let a=Math.random()*6.283,o=W(1,5)*n;i.alpha.emit({x:e+Math.cos(a)*n,y:r,z:t+Math.sin(a)*n,vx:Math.cos(a)*o,vy:W(10,26)*Math.sqrt(n),vz:Math.sin(a)*o,life:W(.8,1.4),s0:W(1.5,3)*n,s1:W(4,7)*n,r:.95,g:.98,b:1,a0:.85,a1:0,kind:3,grav:26})}i.alpha.emit({x:e,y:r+2*n,z:t,vy:6*n,life:1.1,s0:3*n,s1:9*n,r:.92,g:.96,b:1,a0:.7,a1:0,kind:3,grav:4}),this.decals.add(e,t,4*n,2.5,1,.8,2.5),this.decals.add(e,t,5*n,6,0,.9,.6)}hitSpark(e,t=1,n=[2.2,1.4,.6]){let r=this.p;r.add.emit({x:e.x,y:e.y,z:e.z,life:.1,s0:5*t,s1:7*t,r:n[0],g:n[1],b:n[2],a0:1,a1:0});for(let n=0;n<10;n++){let n=Math.random()*6.283,i=W(.2,1.2),a=W(15,40)*t;r.add.emit({x:e.x,y:e.y,z:e.z,vx:Math.cos(n)*Math.cos(i)*a,vy:Math.sin(i)*a,vz:Math.sin(n)*Math.cos(i)*a,life:W(.25,.6),s0:.9*t,s1:.3,r:2.5,g:1.6,b:.6,a0:1,a1:0,kind:2,grav:30,drag:1.5})}r.alpha.emit({x:e.x,y:e.y,z:e.z,vy:2,life:1.2,s0:2*t,s1:7*t,r:.3,g:.29,b:.28,a0:.5,a1:0,kind:1})}explosion(e,t=1,n={}){let r=this.p,i=n.water!==!1,a=n.color||[2.6,1.3,.45];r.add.emit({x:e.x,y:e.y+1,z:e.z,life:.14,s0:14*t,s1:22*t,r:3,g:2.4,b:1.6,a0:1,a1:0});let o=Math.round(18*t+6);for(let n=0;n<o;n++){let n=Math.random()*6.283,i=W(0,1.3),o=W(4,16)*t;r.add.emit({x:e.x,y:e.y+1,z:e.z,vx:Math.cos(n)*Math.cos(i)*o,vy:Math.sin(i)*o+3,vz:Math.sin(n)*Math.cos(i)*o,life:W(.35,.8),s0:W(4,7)*t,s1:W(8,12)*t,r:a[0],g:a[1],b:a[2],r1:.6,g1:.12,b1:.03,a0:1,a1:0,kind:4,drag:3.5})}for(let n=0;n<20*t;n++){let n=Math.random()*6.283,i=W(.3,1.4),a=W(20,55)*t;r.add.emit({x:e.x,y:e.y+1,z:e.z,vx:Math.cos(n)*Math.cos(i)*a,vy:Math.sin(i)*a,vz:Math.sin(n)*Math.cos(i)*a,life:W(.6,1.4),s0:W(.8,1.4)*Math.sqrt(t),s1:.2,r:2.8,g:1.5,b:.5,a0:1,a1:.2,kind:2,grav:22,drag:.8})}for(let n=0;n<10*t+4;n++){let n=Math.random()*6.283,i=W(2,7)*t,a=W(.12,.22);r.alpha.emit({x:e.x+W(-2,2)*t,y:e.y+W(1,4)*t,z:e.z+W(-2,2)*t,vx:Math.cos(n)*i,vy:W(3,9)*t,vz:Math.sin(n)*i,life:W(2.5,4.5)*Math.sqrt(t),s0:5*t,s1:W(14,22)*t,r:a,g:a*.95,b:a*.9,a0:.75,a1:0,kind:1,drag:1.2})}let s=Math.round(4*Math.min(t,2.5));for(let n=0;n<s;n++)this.spawnDebris(e,t);i&&(this.splash(e.x,e.z,t*1.2),this.decals.add(e.x,e.z,9*t,1.2,1,1,3),this.decals.add(e.x,e.z,6*t,10,2,.6,.5),this.ring(e.x,e.z,2*t,22*t,16763024,.5,.08)),this.light(e,16751178,22*Math.min(t,2),45*Math.min(t,2.2),.3+.08*t),t>=1.6&&this.renderer.shockwave(e,Math.min(1.5,t*.5),.6),this.shake(.12*t,e.x,e.z)}megaExplosion(e,t){let n=Math.min(2.6,t/12);this.explosion(e,n),this.p.add.emit({x:e.x,y:e.y+4,z:e.z,life:.3,s0:t*.9,s1:t*1.4,r:1.6,g:1.3,b:1,a0:.8,a1:0}),this.ring(e.x,e.z,4,t*2.2,16769200,.9,.05),this.ring(e.x,e.z,2,t*1.4,16742960,1.2,.2);for(let t=0;t<40;t++){let t=Math.random()*6.283,n=W(10,30);this.p.alpha.emit({x:e.x,y:e.y+2,z:e.z,vx:Math.cos(t)*n,vy:W(0,4),vz:Math.sin(t)*n,life:W(2,3.5),s0:8,s1:22,r:.85,g:.86,b:.88,a0:.5,a1:0,kind:3,drag:1.5})}this.renderer.shockwave(e,2.2,.9),this.renderer.grade.uniforms.uFlash.value=Math.min(.12,this.renderer.grade.uniforms.uFlash.value+.08),this.shake(1.2,e.x,e.z)}spawnDebris(e,t=1){let n;this.dState.length<this.debrisMax?(n={},this.dState.push(n)):(this.dCursor=((this.dCursor||0)+1)%this.debrisMax,n=this.dState[this.dCursor]);let r=Math.random()*6.283,i=W(8,24)*t;n.p=new B(e.x,e.y+2,e.z),n.v=new B(Math.cos(r)*i*.5,W(12,28)*Math.sqrt(t),Math.sin(r)*i*.5),n.r=new B(W(0,6),W(0,6),W(0,6)),n.w=new B(W(-8,8),W(-8,8),W(-8,8)),n.s=W(.4,1.1)*Math.min(1.5,Math.sqrt(t)),n.alive=!0,n.smoke=Math.random()<.5}emp(e,t,n){let r=this.waterY(e,t)+2;this.ring(e,t,2,n,6737151,.6,.06),this.ring(e,t,1,n*.8,11176191,.9,.15),this.p.add.emit({x:e,y:r,z:t,life:.2,s0:n,s1:n*1.6,r:.6,g:1.2,b:2.8,a0:1,a1:0});for(let n=0;n<40;n++){let n=Math.random()*6.283,i=W(20,60);this.p.add.emit({x:e,y:r,z:t,vx:Math.cos(n)*i,vy:W(-2,8),vz:Math.sin(n)*i,life:W(.2,.5),s0:1.2,s1:.2,r:.8,g:1.6,b:3,a0:1,a1:0,kind:2,drag:3})}this.light(new B(e,r,t),6732799,60,n*2.5,.4),this.renderer.shockwave(new B(e,r,t),1,.5),this.shake(.3,e,t)}ageUp(e,t){let n=new V(t),r=this.beam(new B(e.x,-2,e.z),new B(e.x,160,e.z),t,18,1.8);r.userData.pillar=!0;for(let n=0;n<3;n++)this.ring(e.x,e.z,3,40+n*25,t,1+n*.35,.06);for(let t=0;t<80;t++){let t=Math.random()*6.283,r=W(4,20);this.p.add.emit({x:e.x+Math.cos(t)*r,y:W(0,6),z:e.z+Math.sin(t)*r,vx:Math.cos(t)*3,vy:W(15,45),vz:Math.sin(t)*3,life:W(.8,1.8),s0:W(.8,1.8),s1:.1,r:n.r*3,g:n.g*3,b:n.b*3,a0:1,a1:0,kind:2,drag:.5})}this.light(e,t,80,120,1.2),this.renderer.shockwave(e,1.4,.8),this.shake(.35,e.x,e.z)}trailSmoke(e,t=1,n=.8,r=.35){let i=n*W(.85,1.05);this.p.alpha.emit({x:e.x,y:e.y,z:e.z,vy:W(.2,1.2),life:W(.8,1.6),s0:1.2*t,s1:4*t,r:i,g:i,b:i,a0:r,a1:0,kind:1,drag:1})}trailGlow(e,t,n=2,r=.18){this.p.add.emit({x:e.x,y:e.y,z:e.z,life:r,s0:n,s1:n*.3,r:t[0],g:t[1],b:t[2],a0:1,a1:0,kind:0})}fire(e,t=1){this.p.add.emit({x:e.x+W(-1,1)*t,y:e.y,z:e.z+W(-1,1)*t,vx:W(-1,1),vy:W(4,9),vz:W(-1,1),life:W(.3,.6),s0:2.5*t,s1:.8*t,r:2.4,g:1,b:.3,r1:.8,g1:.2,b1:.05,a0:1,a1:0,kind:4}),Math.random()<.5&&this.p.alpha.emit({x:e.x,y:e.y+2,z:e.z,vx:W(-1,1),vy:W(4,8),vz:W(-1,1),life:W(1.5,2.8),s0:2*t,s1:9*t,r:.1,g:.09,b:.09,a0:.55,a1:0,kind:1,drag:.6})}stackSmoke(e,t=.25,n=1){this.p.alpha.emit({x:e.x,y:e.y,z:e.z,vx:W(-.5,.5),vy:W(3,5),vz:W(-.5,.5),life:W(1.8,3),s0:1.5*n,s1:7*n,r:t,g:t,b:t*1.05,a0:.45,a1:0,kind:1,drag:.8})}update(e,t){this.time=t;for(let t of this.lights){let n=t.userData;if(n.life<=0)continue;n.t+=e;let r=n.t/n.life;t.intensity=r>=1?0:n.i0*(1-r)*(1-r),r>=1&&(n.life=0)}for(let t of this.rings){if(!t.visible)continue;let n=t.userData;n.t+=e;let r=n.t/n.life;if(r>=1){t.visible=!1;continue}let i=1-(1-r)**3;t.scale.setScalar(n.r0+(n.r1-n.r0)*i),t.position.y=this.waterY(t.position.x,t.position.z)+.6,t.material.uniforms.uK.value=r}for(let t of this.beams){if(!t.visible)continue;let n=t.userData;n.t+=e;let r=n.t/n.life;if(r>=1){t.visible=!1;continue}n.mat.uniforms.uAlpha.value=n.pillar?Math.sin(r*Math.PI):(1-r)*(1-r),n.pillar||(t.scale.x=t.scale.z=t.scale.z*(1-e*2))}let n=0;for(let t of this.dState)if(t.alive){if(t.v.y-=32*e,t.p.addScaledVector(t.v,e),t.r.addScaledVector(t.w,e),t.smoke&&Math.random()<.6&&this.trailSmoke(t.p,.8,.15,.5),t.p.y<this.waterY(t.p.x,t.p.z)-.5&&t.v.y<0){t.alive=!1,this.p.alpha.emit({x:t.p.x,y:t.p.y+.5,z:t.p.z,vy:8,life:.6,s0:1.5,s1:3.5,r:.95,g:.97,b:1,a0:.8,a1:0,kind:3,grav:20}),this.decals.add(t.p.x,t.p.z,2,1.4,1,.6,2);continue}this._e.set(t.r.x,t.r.y,t.r.z),this._q.setFromEuler(this._e),this._s.setScalar(t.s),this._m.compose(t.p,this._q,this._s),this.debris.setMatrixAt(n++,this._m)}this.debris.count=n,this.debris.instanceMatrix.needsUpdate=!0}},Yd={x:770,z:470},Xd=e=>e.flatMap(e=>e.z===0?[e]:[e,{...e,z:-e.z}]),Zd=e=>e.flatMap(e=>e.x===0?[e]:[e,{...e,x:-e.x}]),Qd=[...Zd(Xd([{x:340,z:170,r:52,kind:`jungle`,seed:1},{x:165,z:205,r:38,kind:`jungle`,seed:2},{x:250,z:95,r:20,kind:`rock`,seed:3},{x:470,z:150,r:24,kind:`rock`,seed:4},{x:95,z:110,r:16,kind:`rock`,seed:5},{x:560,z:420,r:34,kind:`edge`,seed:6},{x:260,z:440,r:30,kind:`edge`,seed:7},{x:700,z:180,r:30,kind:`harbor`,seed:8},{x:700,z:300,r:36,kind:`harbor`,seed:9}])),{x:0,z:440,r:26,kind:`edge`,seed:10},{x:0,z:-440,r:26,kind:`edge`,seed:11}],$d=[...Zd(Xd([{x:300,z:640,r:150,h:120,seed:21},{x:720,z:620,r:170,h:170,seed:22},{x:980,z:300,r:180,h:150,seed:23},{x:1040,z:0,r:150,h:110,seed:24}])),{x:0,z:700,r:200,h:90,seed:25},{x:0,z:-700,r:200,h:90,seed:26}],ef=[{x:-600,z:-40},{x:-560,z:-230},{x:-450,z:-320},{x:-220,z:-335},{x:0,z:-330},{x:220,z:-335},{x:450,z:-320},{x:560,z:-230},{x:600,z:-40}],tf={top:ef,mid:[{x:-600,z:0},{x:-300,z:0},{x:0,z:0},{x:300,z:0},{x:600,z:0}],bot:ef.map(e=>({x:e.x,z:-e.z}))},nf=[`top`,`mid`,`bot`];function rf(e,t){let n=tf[t];return e===0?n:[...n].reverse()}var af=[{lane:`top`,tier:`outer`,x:-250,z:-372},{lane:`top`,tier:`inner`,x:-500,z:-330},{lane:`mid`,tier:`outer`,x:-230,z:34},{lane:`mid`,tier:`inner`,x:-440,z:-34},{lane:`bot`,tier:`outer`,x:-250,z:372},{lane:`bot`,tier:`inner`,x:-500,z:330}],of=[...af.map(e=>({...e,team:0})),...af.map(e=>({...e,team:1,x:-e.x})),{lane:`base`,tier:`citadel`,x:-640,z:0,team:0},{lane:`base`,tier:`citadel`,x:640,z:0,team:1}],sf=[{id:`north`,x:0,z:-200},{id:`south`,x:0,z:200}];function cf(e,t=0){return{x:e===0?-712:712,z:(t-2)*22,yaw:e===0?Math.PI/2:-Math.PI/2}}function lf(e){return{x:e===0?-712:712,z:0,r:85}}function uf(){let e=Qd.map(e=>({x:e.x,z:e.z,r:e.r}));for(let t of of)e.push({x:t.x,z:t.z,r:t.tier===`citadel`?30:t.tier===`inner`?14:12.5});for(let t of sf)e.push({x:t.x,z:t.z,r:17});return e}function df(e,t,n,r,i,a){let o=r-t,s=i-n,c=o*o+s*s||1e-6;for(let r of e){let e=((r.x-t)*o+(r.z-n)*s)/c;e=e<0?0:e>1?1:e;let i=t+o*e-r.x,l=n+s*e-r.z,u=r.r+a;if(i*i+l*l<u*u)return!0}return!1}var ff=class{constructor(e,t=8,n=9){this.obs=e,this.cell=t,this.pad=n,this.w=Math.ceil(Yd.x*2/t),this.h=Math.ceil(Yd.z*2/t),this.blocked=new Uint8Array(this.w*this.h);for(let r=0;r<this.h;r++)for(let i=0;i<this.w;i++){let a=-Yd.x+(i+.5)*t,o=-Yd.z+(r+.5)*t;for(let t of e){let e=t.r+n;if((a-t.x)**2+(o-t.z)**2<e*e){this.blocked[r*this.w+i]=1;break}}}this.g=new Float32Array(this.w*this.h),this.f=new Float32Array(this.w*this.h),this.from=new Int32Array(this.w*this.h),this.stamp=new Uint32Array(this.w*this.h),this.closed=new Uint32Array(this.w*this.h),this.run=0}toCell(e,t){let n=Math.min(this.w-1,Math.max(0,Math.floor((e+Yd.x)/this.cell)));return Math.min(this.h-1,Math.max(0,Math.floor((t+Yd.z)/this.cell)))*this.w+n}center(e){return{x:-Yd.x+(e%this.w+.5)*this.cell,z:-Yd.z+(Math.floor(e/this.w)+.5)*this.cell}}nearestFree(e){if(!this.blocked[e])return e;let t=e%this.w,n=Math.floor(e/this.w);for(let e=1;e<30;e++)for(let r=-e;r<=e;r++)for(let i=-e;i<=e;i++){if(Math.max(Math.abs(i),Math.abs(r))!==e)continue;let a=t+i,o=n+r;if(a<0||o<0||a>=this.w||o>=this.h)continue;let s=o*this.w+a;if(!this.blocked[s])return s}return e}findPath(e,t,n,r){if(!df(this.obs,e,t,n,r,this.pad-2))return[{x:n,z:r}];let i=this.nearestFree(this.toCell(e,t)),a=this.nearestFree(this.toCell(n,r)),o=++this.run,s=this.w,c=a%s,l=Math.floor(a/s),u=[i];this.stamp[i]=o,this.g[i]=0,this.f[i]=0,this.from[i]=-1;let d=e=>{u.push(e);let t=u.length-1;for(;t>0;){let e=t-1>>1;if(this.f[u[e]]<=this.f[u[t]])break;[u[e],u[t]]=[u[t],u[e]],t=e}},f=()=>{let e=u[0],t=u.pop();if(u.length){u[0]=t;let e=0;for(;;){let t=e*2+1,n=t+1,r=e;if(t<u.length&&this.f[u[t]]<this.f[u[r]]&&(r=t),n<u.length&&this.f[u[n]]<this.f[u[r]]&&(r=n),r===e)break;[u[r],u[e]]=[u[e],u[r]],e=r}}return e},p=!1,m=0;for(;u.length&&m++<4e4;){let e=f();if(this.closed[e]===o)continue;if(this.closed[e]=o,e===a){p=!0;break}let t=e%s,n=(e-t)/s;for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(!i&&!r)continue;let a=t+i,u=n+r;if(a<0||u<0||a>=s||u>=this.h)continue;let f=u*s+a;if(this.blocked[f]||this.closed[f]===o||i&&r&&(this.blocked[n*s+a]||this.blocked[u*s+t]))continue;let p=this.g[e]+(i&&r?1.4142:1);if(this.stamp[f]!==o||p<this.g[f]){this.stamp[f]=o,this.g[f]=p,this.from[f]=e;let t=Math.abs(a-c),n=Math.abs(u-l);this.f[f]=p+(t+n)+(1.4142-2)*Math.min(t,n),d(f)}}}if(!p)return[{x:n,z:r}];let h=[];for(let e=a;e!==-1;e=this.from[e])h.push(e);h.reverse();let g=h.map(e=>this.center(e));g[g.length-1]={x:n,z:r};let _=[],v=e,y=t,b=0;for(;b<g.length;){let e=g.length-1;for(;e>b&&df(this.obs,v,y,g[e].x,g[e].z,this.pad-3);)e--;_.push(g[e]),v=g[e].x,y=g[e].z,b=e+1}return _}},pf=[{id:0,name:`Azure Dominion`,short:`Azure`,color:3120127,glow:6276351,css:`#4db4ff`},{id:1,name:`Crimson Hegemony`,short:`Crimson`,color:16726831,glow:16742973,css:`#ff5a4a`}],mf={duration:600,firstWave:12,waveInterval:30,passiveGold:5,startGold:200,respawnBase:5,respawnPerAge:2.5,fountainHeal:.12,maxLevel:12},hf=[{id:1,name:`Age of Sail`,short:`Sail`,cost:0,blurb:`Timber hulls, canvas and black powder.`},{id:2,name:`Age of Steam`,short:`Steam`,cost:600,blurb:`Iron plating and coal-fired engines.`},{id:3,name:`Age of Dreadnoughts`,short:`Dreadnought`,cost:1300,blurb:`Big-gun turrets and the torpedo.`},{id:4,name:`Age of Airpower`,short:`Airpower`,cost:2200,blurb:`Flight decks, radar and cruise missiles.`},{id:5,name:`Age of Swarms`,short:`Swarm`,cost:3e3,blurb:`Railguns, lasers and autonomous drone swarms.`}],gf={1:[`frigate`],2:[`ironclad`],3:[`dreadnought`,`torpedo`],4:[`battleship`,`carrier`],5:[`arsenal`,`mothership`]},_f={frigate:{name:`Ship-of-the-Line Frigate`,age:1,role:`Brawler`,desc:`Three-masted man-o-war. Broadside cannons and chain shot.`,hp:950,armor:0,speed:26,turn:1.6,radius:7,guns:{range:58,dmg:30,cd:1.3,count:2,kind:`ball`,speed:95},abilities:[`chainshot`,`fullsail`,`grapeshot`,`bombard`]},ironclad:{name:`Steam Ironclad`,age:2,role:`Bruiser`,desc:`Armoured casemate ram powered by coal. Explosive shells.`,hp:1550,armor:.1,speed:25,turn:1.5,radius:8,guns:{range:64,dmg:44,cd:1.25,count:2,kind:`shell`,speed:110},abilities:[`he_shell`,`steamsurge`,`ram`,`mortar`]},dreadnought:{name:`Dreadnought`,age:3,role:`Artillery`,desc:`All-big-gun battleship. Devastating salvos at long range.`,hp:2450,armor:.2,speed:23,turn:1.2,radius:10,guns:{range:78,dmg:72,cd:1.5,count:3,kind:`shell`,speed:125},abilities:[`mainbattery`,`smoke`,`plating`,`fullbroadside`]},torpedo:{name:`Torpedo Cruiser`,age:3,role:`Assassin`,desc:`Fast, lean hunter. Torpedo spreads and depth charges.`,hp:1950,armor:.12,speed:31,turn:1.9,radius:8,guns:{range:66,dmg:50,cd:1,count:2,kind:`shell`,speed:120},abilities:[`torpspread`,`afterburn`,`depthcharge`,`wolfpack`]},battleship:{name:`Fast Battleship`,age:4,role:`Artillery`,desc:`Radar-guided main battery, flak and cruise missiles.`,hp:3450,armor:.25,speed:23,turn:1.15,radius:11,guns:{range:86,dmg:104,cd:1.6,count:3,kind:`shell`,speed:140},abilities:[`mainbattery2`,`flak`,`damagecontrol`,`cruise`]},carrier:{name:`Fleet Carrier`,age:4,role:`Controller`,desc:`Floating airfield. Launches fighter squadrons and dive bombers.`,hp:3e3,armor:.18,speed:24,turn:1.1,radius:12,guns:{range:72,dmg:50,cd:.9,count:2,kind:`flak`,speed:150},abilities:[`fighters`,`divebomb`,`damagecontrol`,`airwing`]},arsenal:{name:`Arsenal Cruiser`,age:5,role:`Artillery`,desc:`Stealth-hulled railgun platform with vertical launch missiles.`,hp:3950,armor:.25,speed:25,turn:1.3,radius:11,guns:{range:96,dmg:128,cd:1.4,count:2,kind:`pulse`,speed:260},abilities:[`railgun`,`pointdefense`,`salvo`,`hypersonic`]},mothership:{name:`Drone Mothership`,age:5,role:`Swarm`,desc:`Autonomous hive-carrier. Blots out the sky with tactical drones.`,hp:3700,armor:.2,speed:25,turn:1.2,radius:12,guns:{range:82,dmg:64,cd:.8,count:2,kind:`laser`,speed:0},abilities:[`microswarm`,`aegis`,`emp`,`hivestorm`]}},vf={chainshot:{name:`Chain Shot`,type:`projectile`,target:`dir`,cd:7,range:95,dmg:95,speed:120,count:1,spread:0,radius:3,slow:.45,slowDur:2.2,model:`chain`,desc:`Fire spinning chained balls that shred rigging, slowing the target.`},fullsail:{name:`Full Sail`,type:`buff`,target:`self`,cd:12,speedMul:1.65,dur:3.2,desc:`Catch the wind: +65% speed for 3s.`},grapeshot:{name:`Grapeshot`,type:`projectile`,target:`dir`,cd:8,range:55,dmg:26,speed:140,count:9,spread:.7,radius:2.5,model:`ball`,desc:`A scatter-blast of iron shot in a wide cone.`},bombard:{name:`Bombard`,type:`barrage`,target:`point`,cd:38,range:120,minLevel:3,dmg:70,count:12,area:20,radius:7,delay:.9,spreadTime:1.4,model:`ball`,desc:`Every gun fires at once, raining a dozen shots on an area.`},he_shell:{name:`High-Explosive Shell`,type:`projectile`,target:`dir`,cd:7,range:110,dmg:170,speed:130,count:1,spread:0,radius:12,model:`shell_big`,desc:`A shell that detonates on impact, damaging everything nearby.`},steamsurge:{name:`Steam Surge`,type:`buff`,target:`self`,cd:12,speedMul:1.7,dmgTaken:.8,dur:3,desc:`Overpressure the boilers: +70% speed and 20% damage reduction.`},ram:{name:`Iron Ram`,type:`dash`,target:`dir`,cd:11,range:50,dmg:190,stun:.9,radius:10,desc:`Charge forward, ramming and stunning ships in your path.`},mortar:{name:`Mortar Barrage`,type:`barrage`,target:`point`,cd:40,range:140,minLevel:3,dmg:85,count:16,area:26,radius:8,delay:1.1,spreadTime:2,model:`shell`,desc:`High-arc mortars saturate an area for 2 seconds.`},mainbattery:{name:`Main Battery`,type:`barrage`,target:`point`,cd:8,range:125,dmg:150,count:6,area:12,radius:8,delay:.7,spreadTime:.35,model:`shell_big`,desc:`A six-gun salvo from the 12-inch turrets.`},smoke:{name:`Smoke Screen`,type:`smoke`,target:`self`,cd:18,dur:4.5,radius:32,desc:`Deploy smoke. Allied ships inside cannot be targeted by guns or towers.`},plating:{name:`Belt Armour`,type:`buff`,target:`self`,cd:14,shield:650,dur:4,desc:`Brace the belt armour: absorb 650 damage for 4s.`},fullbroadside:{name:`Full Broadside`,type:`volley`,target:`auto`,cd:45,range:100,minLevel:3,dmg:115,count:18,radius:7,spreadTime:1.5,model:`shell_big`,desc:`Unload every barrel at all enemies within range.`},torpspread:{name:`Torpedo Spread`,type:`projectile`,target:`dir`,cd:8,range:150,dmg:230,speed:72,count:3,spread:.32,radius:8,model:`torpedo`,desc:`Launch three torpedoes in a fan.`},afterburn:{name:`Flank Speed`,type:`buff`,target:`self`,cd:10,speedMul:1.9,dur:2.5,desc:`Emergency flank speed: +90% for 2.5s.`},depthcharge:{name:`Mine Field`,type:`mines`,target:`self`,cd:14,count:5,dmg:190,radius:13,dur:22,desc:`Drop proximity mines in your wake.`},wolfpack:{name:`Wolfpack`,type:`homing`,target:`auto`,cd:45,range:140,minLevel:3,dmg:210,count:10,speed:80,radius:8,model:`torpedo`,desc:`Ten homing torpedoes hunt every enemy nearby.`},mainbattery2:{name:`Radar Salvo`,type:`barrage`,target:`point`,cd:8,range:145,dmg:205,count:6,area:14,radius:9,delay:.6,spreadTime:.3,model:`shell_big`,desc:`Radar-directed nine-gun salvo.`},flak:{name:`Flak Umbrella`,type:`pointdefense`,target:`self`,cd:16,dur:4.5,radius:45,desc:`Shred incoming drones, aircraft and missiles around you.`},damagecontrol:{name:`Damage Control`,type:`buff`,target:`self`,cd:18,healPct:.33,dur:4,desc:`Repair crews restore 33% hull over 4s.`},cruise:{name:`Cruise Missiles`,type:`homing`,target:`auto`,cd:45,range:210,minLevel:3,dmg:270,count:8,speed:115,radius:11,model:`missile`,desc:`Vertical-launch cruise missiles strike 8 targets.`},fighters:{name:`Fighter Squadron`,type:`swarm`,target:`point`,cd:14,range:140,count:6,drone:`fighter`,dur:14,dmg:18,fireCd:.35,radius:0,desc:`Launch six fighters that strafe enemies near the target.`},divebomb:{name:`Dive Bombers`,type:`swarm`,target:`point`,cd:12,range:170,count:4,drone:`bomber`,dur:6,dmg:220,radius:15,desc:`Bombers dive on the target area.`},airwing:{name:`Air Wing Alpha`,type:`swarm`,target:`point`,cd:50,range:190,minLevel:3,count:16,drone:`fighter`,extra:{drone:`bomber`,count:6},dur:18,dmg:20,fireCd:.3,radius:15,desc:`Launch the full air wing: 16 fighters and 6 bombers.`},railgun:{name:`Railgun`,type:`beam`,target:`dir`,cd:7,range:230,dmg:390,width:5,desc:`Hypervelocity slug pierces everything in a line.`},pointdefense:{name:`Point Defense Lasers`,type:`pointdefense`,target:`self`,cd:15,dur:5,radius:55,laser:!0,desc:`Laser CIWS vaporises drones and missiles nearby.`},salvo:{name:`VLS Salvo`,type:`homing`,target:`auto`,cd:10,range:155,dmg:95,count:12,speed:130,radius:6,model:`missile`,desc:`Ripple-fire 12 missiles from vertical launch cells.`},hypersonic:{name:`Hypersonic Strike`,type:`barrage`,target:`point`,cd:50,range:420,minLevel:3,dmg:950,count:1,area:0,radius:42,delay:1.6,spreadTime:0,model:`hypersonic`,desc:`A Mach-8 glide vehicle obliterates a wide area after 1.6s.`},microswarm:{name:`Micro Swarm`,type:`swarm`,target:`point`,cd:9,range:150,count:24,drone:`micro`,dur:8,dmg:48,radius:5,desc:`Release 24 kamikaze micro-drones that seek enemies.`},aegis:{name:`Aegis Drones`,type:`buff`,target:`self`,cd:16,shield:850,dur:6,drones:6,desc:`Six shield drones orbit your hull, absorbing 850 damage.`},emp:{name:`EMP Drone`,type:`projectile`,target:`dir`,cd:14,range:130,dmg:150,speed:110,count:1,spread:0,radius:30,stun:1.6,model:`emp`,desc:`An EMP drone detonates, stunning and silencing an area.`},hivestorm:{name:`Hive Storm`,type:`swarm`,target:`point`,cd:55,range:200,minLevel:3,count:80,drone:`micro`,dur:10,dmg:42,radius:5,desc:`Eighty tactical drones blot out the sun over the target area.`}},yf=[{id:`plating`,name:`Hull Plating`,icon:`🛡`,max:5,cost:[150,250,350,450,550],desc:`+10% max hull per level`},{id:`gunnery`,name:`Gunnery`,icon:`🎯`,max:5,cost:[150,250,350,450,550],desc:`+10% weapon & ability damage`},{id:`engines`,name:`Engines`,icon:`⚙`,max:5,cost:[120,200,280,360,440],desc:`+6% speed per level`},{id:`reload`,name:`Reload Drills`,icon:`⟳`,max:5,cost:[150,250,350,450,550],desc:`-7% cooldowns & reload`},{id:`repair`,name:`Repair Crews`,icon:`✚`,max:5,cost:[120,200,280,360,440],desc:`+0.4% hull regen /s`}],bf={light:{hp:300,dmg:16,cd:1.2,range:46,speed:21,radius:4,gold:40,xp:45},heavy:{hp:620,dmg:30,cd:1.6,range:55,speed:19,radius:5.5,gold:72,xp:80},eraScale:.42},xf={outer:{hp:5600,dmg:100,cd:1.2,range:82,armor:.3,radius:9,gold:220},inner:{hp:7600,dmg:125,cd:1.2,range:86,armor:.35,radius:10,gold:280},citadel:{hp:18e3,dmg:200,cd:1,range:100,armor:.4,radius:22,gold:0},scalePerMin:.07},Sf={captureTime:5,radius:32,goldPerSec:2},Cf={heroGold:240,heroGoldPerAge:80,assistGold:90,streakGold:50,heroXp:160,heroXpPerLevel:40,xpShareRadius:110},wf=[`Nelson`,`Yamamoto`,`Zheng He`,`Drake`,`Tōgō`,`Nimitz`,`Barbarossa`,`Yi Sun-sin`,`de Ruyter`,`Cochrane`,`Farragut`,`Jervis`,`Halsey`,`Ching Shih`,`Tromp`,`Themistocles`],Tf={easy:{react:.9,aim:.55,abilityRate:.35,aggression:.35,goldMul:.85},normal:{react:.5,aim:.8,abilityRate:.65,aggression:.55,goldMul:1},hard:{react:.25,aim:.95,abilityRate:.95,aggression:.75,goldMul:1.15}},Ef=new B;function Df(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Ef.copy(t),Ef[r]=0,Ef.normalize();let l=.5*o/(o+s),u=1-Ef.angleTo(e)/c;return Math.sign(Ef[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Of=class e extends Wi{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new B,c=new B,l=new B(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new B,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=Df(m,c,`z`,`y`,i,n),f[a+1]=1-Df(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-Df(m,c,`z`,`y`,i,n),f[a+1]=1-Df(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-Df(m,c,`x`,`z`,i,e),f[a+1]=Df(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-Df(m,c,`x`,`z`,i,e),f[a+1]=1-Df(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-Df(m,c,`x`,`y`,i,e),f[a+1]=1-Df(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=Df(m,c,`x`,`y`,i,e),f[a+1]=1-Df(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},kf=new Map,Af=new Map,jf={color:14212578,glow:14677247};function Mf(e){return e!=null&&e>=0&&pf[e]?pf[e]:jf}function Nf(e){let t=e>>>0||1;return()=>(t^=t<<13,t>>>=0,t^=t>>>17,t^=t<<5,t>>>=0,t/4294967296)}function Pf(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,[n,n.getContext(`2d`)]}function Ff(t,{repeat:n=!0,srgb:r=!0,aniso:i=8}={}){let a=new Bi(t);return n&&(a.wrapS=a.wrapT=e),r&&(a.colorSpace=Be),a.anisotropy=i,a.generateMipmaps=!0,a.minFilter=c,a.needsUpdate=!0,a}function If(e,t,n){return`hsl(${e},${t}%,${n}%)`}function Lf(e,{w:t=512,h:n=512,rows:r=16,hue:i=28,sat:a=45,light:o=34,jitter:s=7,seam:c=`rgba(20,10,5,0.85)`,seamW:l=2,grain:u=.1,seed:d=7}){if(Af.has(e))return Af.get(e);let[f,p]=Pf(t,n),m=Nf(d),h=n/r;for(let e=0;e<r;e++){let n=-m()*t*.5;for(;n<t;){let r=t*(.35+m()*.45),d=o+(m()-.5)*s*2;p.fillStyle=If(i+(m()-.5)*6,a+(m()-.5)*10,d),p.fillRect(n,e*h,r,h);for(let t=0;t<10;t++){let i=e*h+m()*h;p.strokeStyle=`rgba(${m()<.5?`40,20,8`:`255,230,190`},${u*m()})`,p.lineWidth=.6+m()*1.2,p.beginPath(),p.moveTo(n,i);let a=m()*1.6;for(let e=n;e<=n+r;e+=16)p.lineTo(e,i+Math.sin(e*.03+t)*a);p.stroke()}if(m()<.18){let t=n+m()*r,i=e*h+h*.5;p.fillStyle=`rgba(40,20,8,0.35)`,p.beginPath(),p.ellipse(t,i,5+m()*5,2+m()*2,0,0,Math.PI*2),p.fill()}p.fillStyle=c,p.fillRect(n+r-1,e*h,l*.75,h),n+=r}p.fillStyle=c,p.fillRect(0,e*h,t,l)}let g=Ff(f);return Af.set(e,g),g}function Rf(){return Lf(`wood`,{rows:16,hue:26,sat:48,light:30,jitter:5,seamW:2,grain:.14,seed:11})}function zf(){return Lf(`teak`,{rows:20,hue:32,sat:20,light:44,jitter:2.5,seam:`rgba(40,30,20,0.55)`,seamW:1.4,grain:.05,seed:23})}function Bf(){let e=`stone`;if(Af.has(e))return Af.get(e);let[t,n]=Pf(512,512),r=Nf(99);n.fillStyle=`#3a3733`,n.fillRect(0,0,512,512);for(let e=0;e<8;e++){let t=e%2*-40-r()*30;for(;t<512;){let i=70+r()*60,a=62+(r()-.5)*14;n.fillStyle=If(36+(r()-.5)*10,10+r()*6,a),n.fillRect(t+2,e*64+2,i-4,60);for(let a=0;a<40;a++)n.fillStyle=`rgba(${r()<.5?`0,0,0`:`255,255,255`},${.05*r()})`,n.fillRect(t+r()*i,e*64+r()*64,2+r()*8,2+r()*6);let o=n.createLinearGradient(0,e*64,0,e*64+64);o.addColorStop(0,`rgba(0,0,0,0)`),o.addColorStop(1,`rgba(30,25,15,0.18)`),n.fillStyle=o,n.fillRect(t+2,e*64+2,i-4,60),t+=i}}let i=Ff(t);return Af.set(e,i),i}function Vf(){let e=`plate`;if(Af.has(e))return Af.get(e);let[t,n]=Pf(512,512),r=Nf(5);n.fillStyle=`#d6d6d6`,n.fillRect(0,0,512,512);for(let e=0;e<900;e++)n.fillStyle=`rgba(${r()<.6?`0,0,0`:`255,255,255`},${.035*r()})`,n.fillRect(r()*512,r()*512,4+r()*30,2+r()*14);n.strokeStyle=`rgba(0,0,0,0.22)`,n.lineWidth=2;for(let e=0;e<=512;e+=128)n.beginPath(),n.moveTo(0,e),n.lineTo(512,e),n.stroke();for(let e=0;e<4;e++)for(let t=e%2*96;t<=512;t+=192)n.beginPath(),n.moveTo(t,e*128),n.lineTo(t,e*128+128),n.stroke();for(let e=0;e<14;e++){let e=r()*512,t=r()*512,i=n.createLinearGradient(e,t,e,t+60);i.addColorStop(0,`rgba(90,50,20,0.10)`),i.addColorStop(1,`rgba(90,50,20,0)`),n.fillStyle=i,n.fillRect(e,t,3,60)}let i=Ff(t,{srgb:!0});return Af.set(e,i),i}function Hf(){let e=`flightdeck`;if(Af.has(e))return Af.get(e);let t=2048,[n,r]=Pf(512,t),i=Nf(41);r.fillStyle=`#44484d`,r.fillRect(0,0,512,t);for(let e=0;e<5e3;e++)r.fillStyle=`rgba(${i()<.5?`0,0,0`:`255,255,255`},${.04*i()})`,r.fillRect(i()*512,i()*t,2+i()*10,2+i()*10);for(let e=0;e<40;e++){r.strokeStyle=`rgba(10,10,10,${.08+i()*.1})`,r.lineWidth=3+i()*4;let e=512*(.35+i()*.3),n=t*(.45+i()*.5);r.beginPath(),r.moveTo(e,n),r.lineTo(e+(i()-.5)*40,n-150-i()*200),r.stroke()}r.strokeStyle=`rgba(0,0,0,0.25)`,r.lineWidth=2;for(let e=0;e<t;e+=64)r.beginPath(),r.moveTo(0,e),r.lineTo(512,e),r.stroke();r.fillStyle=`#e8e8e0`,r.fillRect(14,0,6,t),r.fillRect(492,0,6,t);for(let e=60;e<1988;e+=90)r.fillRect(251,e,10,50);r.strokeStyle=`#e5b92e`,r.lineWidth=5,r.beginPath(),r.moveTo(102.4,t*.05),r.lineTo(102.4,t*.95),r.stroke(),r.fillStyle=`rgba(15,15,15,0.8)`,r.fillRect(174.08,20,8,t*.2),r.fillRect(317.44,20,8,t*.18),r.fillStyle=`#e5b92e`,r.fillRect(162.08,t*.2,32,6),r.fillRect(305.44,t*.18,32,6),r.strokeStyle=`#d8d8cf`,r.lineWidth=4,r.strokeRect(184.32,t*.3,143.36,133.12),r.strokeRect(184.32,t*.62,143.36,133.12);for(let e=0;e<10;e++)r.fillStyle=e%2?`#e8e8e0`:`#b82a22`,r.fillRect(e*512/10,2020,512/10,28);r.fillStyle=`rgba(210,210,200,0.8)`;for(let e=0;e<4;e++)r.fillRect(92.16,t*.86+e*34,327.68,3);r.save(),r.translate(256,t*.08),r.fillStyle=`#e8e8e0`,r.font=`bold 150px sans-serif`,r.textAlign=`center`,r.textBaseline=`middle`,r.fillText(`07`,0,0),r.restore();let a=Ff(n,{repeat:!1,aniso:16});return Af.set(e,a),a}function Uf(e,t,n,r,i,a){if(e.save(),e.translate(n,r),e.fillStyle=a,t===0){e.beginPath();for(let t=0;t<10;t++){let n=-Math.PI/2+t*Math.PI/5,r=t%2?i*.42:i;e.lineTo(Math.cos(n)*r,Math.sin(n)*r)}e.closePath(),e.fill()}else if(t===1){e.beginPath(),e.arc(0,0,i*.45,0,Math.PI*2),e.fill();for(let t=0;t<12;t++){let n=t*Math.PI/6;e.beginPath(),e.moveTo(Math.cos(n-.12)*i*.55,Math.sin(n-.12)*i*.55),e.lineTo(Math.cos(n)*i*1.05,Math.sin(n)*i*1.05),e.lineTo(Math.cos(n+.12)*i*.55,Math.sin(n+.12)*i*.55),e.fill()}}else e.beginPath(),e.arc(0,0,i*.5,0,Math.PI*2),e.fill();e.restore()}function Wf(e){return`#`+e.toString(16).padStart(6,`0`)}function Gf(e){let t=`sail:`+e;if(Af.has(t))return Af.get(t);let[n,r]=Pf(512,256),i=Nf(3),a=Mf(e);for(let t=0;t<2;t++){let n=t*256,o=r.createLinearGradient(0,0,0,256);o.addColorStop(0,`#e9dfc6`),o.addColorStop(1,`#d6c7a4`),r.fillStyle=o,r.fillRect(n,0,256,256);for(let e=0;e<256;e+=21)r.fillStyle=`rgba(90,70,40,${.1+i()*.06})`,r.fillRect(n+e,0,1.5,256),r.fillStyle=`rgba(255,250,235,${.05+i()*.05})`,r.fillRect(n+e+2,0,8,256);r.fillStyle=`rgba(90,70,40,0.18)`,r.fillRect(n,51.2,256,2),r.fillRect(n,81.92,256,2);let s=r.createLinearGradient(0,192,0,256);s.addColorStop(0,`rgba(80,60,30,0)`),s.addColorStop(1,`rgba(80,60,30,0.2)`),r.fillStyle=s,r.fillRect(n,0,256,256),e!=null&&e>=0&&(r.fillStyle=Wf(a.color),r.fillRect(n,163.84,256,30.72),r.fillStyle=`rgba(255,255,255,0.35)`,r.fillRect(n,163.84,256,3),r.fillRect(n,191.56,256,3),t===1&&(r.fillStyle=Wf(a.color),r.beginPath(),r.arc(n+128,97.28,46,0,Math.PI*2),r.fill(),r.strokeStyle=`#f4ecd8`,r.lineWidth=5,r.stroke(),Uf(r,e,n+128,97.28,30,`#f7f0dc`))),r.strokeStyle=`rgba(90,70,40,0.5)`,r.lineWidth=4,r.strokeRect(n+2,2,252,252)}let o=Ff(n,{repeat:!1});return Af.set(t,o),o}function Kf(e){let t=`flag:`+e;if(Af.has(t))return Af.get(t);let[n,r]=Pf(128,64),i=Mf(e),a=!(e!=null&&e>=0);r.fillStyle=a?`#d9dcdf`:Wf(i.color),r.fillRect(0,0,128,64),r.fillStyle=`rgba(0,0,0,0.18)`,r.fillRect(0,56,128,8),r.fillStyle=`rgba(255,255,255,0.25)`,r.fillRect(0,0,128,6),a?(r.fillStyle=`#9aa0a6`,r.fillRect(20,26,88,12)):Uf(r,e,42,32,18,`#ffffff`);let o=Ff(n,{repeat:!1});return Af.set(t,o),o}function qf(){let e=`emask`;if(Af.has(e))return Af.get(e);let t=new ai(new Uint8Array([0,0,0,255,0,0,0,255,255,255,255,255,255,255,255,255]),4,1);return t.magFilter=r,t.minFilter=r,t.needsUpdate=!0,Af.set(e,t),t}var Jf={wood:e=>({color:16777215,map:Rf(),bumpMap:Rf(),bumpScale:1.2,roughness:.78,metalness:0}),darkwood:()=>({color:9071184,map:Rf(),roughness:.7,metalness:0}),teak:()=>({color:14209220,map:zf(),bumpMap:zf(),bumpScale:.8,roughness:.72,metalness:0}),sail:e=>({color:11840408,map:Gf(e),roughness:.92,metalness:0,side:2}),iron:()=>({color:2895411,roughness:.42,metalness:.75}),steel:()=>({color:9081756,map:Vf(),roughness:.55,metalness:.35}),darksteel:()=>({color:4870232,map:Vf(),roughness:.5,metalness:.4}),rubber:()=>({color:1316119,roughness:.92,metalness:0}),brass:()=>({color:13805646,roughness:.28,metalness:1}),glass:()=>({physical:!0,color:726560,roughness:.06,metalness:.1,clearcoat:1,clearcoatRoughness:.05,emissive:664112,emissiveIntensity:.6}),stealth:()=>({color:3883078,roughness:.58,metalness:.45,flatShading:!0}),stealthDark:()=>({color:2369581,roughness:.5,metalness:.5,flatShading:!0}),flightDeck:()=>({color:16777215,map:Hf(),roughness:.82,metalness:.1}),team:e=>({color:Mf(e).color,roughness:.45,metalness:.2}),teamMetal:e=>({color:Mf(e).color,roughness:.3,metalness:.8}),teamGlow:e=>({color:0,emissive:Mf(e).glow,emissiveIntensity:3.2,roughness:.4,metalness:0,toneMapped:!0}),teamPulse:e=>({color:0,emissive:Mf(e).glow,emissiveIntensity:3,roughness:.4,metalness:0}),lantern:()=>({color:2101256,emissive:16754762,emissiveIntensity:4.5,roughness:.5}),furnace:()=>({color:1049856,emissive:16731410,emissiveIntensity:4,roughness:.6}),lamp:()=>({color:2105376,emissive:16773840,emissiveIntensity:6,roughness:.3}),navRed:()=>({color:2097152,emissive:16719904,emissiveIntensity:5}),navGreen:()=>({color:8192,emissive:2162512,emissiveIntensity:5}),white:()=>({color:15131870,roughness:.6,metalness:.05}),paint:()=>({color:16777215,roughness:.6,metalness:.1}),stone:()=>({color:16777215,map:Bf(),bumpMap:Bf(),bumpScale:1.5,roughness:.9,metalness:0}),rock:()=>({color:16777215,roughness:.95,metalness:0,vc:!0}),flag:e=>({color:16777215,map:Kf(e),roughness:.85,metalness:0,side:2}),flagNeutral:()=>({color:16777215,map:Kf(-1),roughness:.85,metalness:0,side:2}),lightBeam:()=>({basic:!0,color:16773320,transparent:!0,opacity:.07,blending:2,depthWrite:!1,side:2}),teamBeam:e=>({basic:!0,color:Mf(e).glow,transparent:!0,opacity:.22,blending:2,depthWrite:!1,side:2})},Yf=new Set([`team`,`teamMetal`,`teamGlow`,`teamPulse`,`sail`,`flag`,`teamBeam`]);Object.keys(Jf);function Xf(e,t,n=!1){if(!Jf[e])throw Error(`Unknown material `+e);let r=Yf.has(e)&&t!=null&&t>=0?t:-1,i=e+`:`+r+`:`+ +!!n,a=kf.get(i);if(a)return a;let o={...Jf[e](r)},s=o.physical;delete o.physical;let c=o.basic;delete o.basic;let l=o.vc;return delete o.vc,(n||l)&&(o.vertexColors=!0),a=c?new Wr(o):s?new Xa(o):new Ya(o),c||dd(a),a.name=i,kf.set(i,a),a}var Zf=-1;function Qf(e){if(e===Zf)return;Zf=e;let t=2.4+1.6*(.5+.5*Math.sin(e*3.1));for(let[e,n]of kf)e.startsWith(`teamPulse:`)&&(n.emissiveIntensity=t)}var G=B,K=Math.PI,$f=(e,t,n)=>e<t?t:e>n?n:e,ep=(e,t,n)=>e+(t-e)*n;function tp(e,t,n){let r=$f((n-e)/(t-e),0,1);return r*r*(3-2*r)}var np=new V,rp=new Wr({color:16711935});function q(e=0,t=0,n=0,r=0,i=0,a=0,o=1,s=o,c=o){return new tn().compose(new G(e,t,n),new jt().setFromEuler(new fn(r,i,a,`YXZ`)),new G(o,s,c))}function ip(e,t=16777215){let n=e.index?e.toNonIndexed():e.clone();for(let e of Object.keys(n.attributes))e!==`position`&&e!==`normal`&&e!==`uv`&&n.deleteAttribute(e);n.morphAttributes={},n.morphTargetsRelative=!1,n.clearGroups(),n.attributes.normal||n.computeVertexNormals();let r=n.attributes.position.count;n.attributes.uv||n.setAttribute(`uv`,new H(new Float32Array(r*2),2)),np.set(t);let i=new Float32Array(r*3);for(let e=0;e<r;e++)i[e*3]=np.r,i[e*3+1]=np.g,i[e*3+2]=np.b;return n.setAttribute(`color`,new H(i,3)),n}function ap(e){let t=e.clone(),n=t.attributes.position.array,r=t.attributes.normal.array;for(let e=0;e<n.length;e+=3)n[e]=-n[e],r[e]=-r[e];for(let e of Object.keys(t.attributes)){let n=t.attributes[e],r=n.itemSize,i=n.array;for(let e=0;e<n.count;e+=3)for(let t=0;t<r;t++){let n=(e+1)*r+t,a=(e+2)*r+t,o=i[n];i[n]=i[a],i[a]=o}}return t}var op=class{constructor(){this.map=new Map}add(e,t,n=16777215,r=null){let i=ip(t,n);return r&&i.applyMatrix4(r),this.map.has(e)||this.map.set(e,[]),this.map.get(e).push(i),i}addRaw(e,t){this.map.has(e)||this.map.set(e,[]),this.map.get(e).push(t)}addMirrored(e,t,n,r){let i=this.add(e,t,n,r);this.addRaw(e,ap(i))}box(e,t,n,r,i,a,o,s,c=0,l=0,u=0){return this.add(e,new Wi(t,n,r),s,q(i,a,o,c,l,u))}rbox(e,t,n,r,i,a,o,s,c,l=0,u=0,d=0){return this.add(e,new Of(t,n,r,2,Math.min(i,t/2,n/2,r/2)*.999),c,q(a,o,s,l,u,d))}cyl(e,t,n,r,i,a,o,s,c=12,l=0,u=0,d=0,f=!1){return this.add(e,new Ki(t,n,r,c,1,f),s,q(i,a,o,l,u,d))}rod(e,t,n,r,i,a,o=8){return this.add(e,dp(t,n,r,i,o),a)}sphere(e,t,n,r,i,a,o=12,s=8,c=1,l=c,u=c){return this.add(e,new La(t,o,s),a,q(n,r,i,0,0,0,c,l,u))}build(e,{cast:t=!0,receive:n=!0}={}){let r=[];for(let[i,a]of this.map){let o=lp(a,i);if(!o)continue;o.computeBoundingSphere(),o.computeBoundingBox();let s=new ni(o,rp);s.userData.mat=i,s.castShadow=t&&!/Glow|Pulse|lantern|lamp|furnace|Beam|nav/.test(i),s.receiveShadow=n,s.name=i,e.add(s),r.push(s)}return this.map.clear(),r}},sp=[`position`,`normal`,`uv`,`color`];function cp(e){let t=e.index?e.toNonIndexed():e;for(let e of Object.keys(t.attributes))sp.includes(e)||t.deleteAttribute(e);t.attributes.normal||t.computeVertexNormals();let n=t.attributes.position.count;t.attributes.uv||t.setAttribute(`uv`,new H(new Float32Array(n*2),2)),t.attributes.color||t.setAttribute(`color`,new H(new Float32Array(n*3).fill(1),3));for(let e of sp){let n=t.attributes[e];if(n.isInterleavedBufferAttribute||n.normalized||!(n.array instanceof Float32Array)){let r=new Float32Array(n.count*n.itemSize);for(let e=0;e<n.count;e++)for(let t=0;t<n.itemSize;t++)r[e*n.itemSize+t]=n.getComponent(e,t);t.setAttribute(e,new H(r,n.itemSize))}}return t.morphAttributes={},t.morphTargetsRelative=!1,t.clearGroups(),t}function lp(e,t){if(e.length===1)return cp(e[0]);let n=vd(e,!1);if(n)return n;let r=e.map(cp);if(n=vd(r,!1),n)return console.warn(`[models] merge needed normalisation for material`,t),n;let i=[];return r.forEach((e,n)=>{i.length&&!vd([i[0],e],!1)?console.warn(`[models] dropping mismatching part`,n,`of`,t,Object.keys(e.attributes)):i.push(e)}),i.length?i.length===1?i[0]:vd(i,!1):null}var up=new G(0,1,0);function dp(e,t,n,r,i=8){let a=new G(...n),o=new G(...r),s=o.clone().sub(a),c=new Ki(t,e,s.length(),i,1,!1),l=new jt().setFromUnitVectors(up,s.normalize());return c.applyMatrix4(new tn().compose(a.clone().add(o).multiplyScalar(.5),l,new G(1,1,1))),c}var fp=class{constructor(){this.p=[],this.n=[],this.uv=[]}tri(e,t,n,r,i){let a=new G().subVectors(t,e),o=new G().subVectors(n,e),s=new G().crossVectors(a,o);if(!(s.lengthSq()<1e-14)){if(s.normalize(),r&&s.dot(r)<0){let e=t;t=n,n=e,s.negate(),i&&=[i[0],i[2],i[1]]}for(let r of[e,t,n])this.p.push(r.x,r.y,r.z),this.n.push(s.x,s.y,s.z);if(i)for(let e of i)this.uv.push(e[0],e[1]);else this.uv.push(e.x*.25,e.z*.25,t.x*.25,t.z*.25,n.x*.25,n.z*.25)}}quad(e,t,n,r,i,a){this.tri(e,t,n,i,a&&[a[0],a[1],a[2]]),this.tri(e,n,r,i,a&&[a[0],a[2],a[3]])}geo(){let e=new Mr;return e.setAttribute(`position`,new H(this.p,3)),e.setAttribute(`normal`,new H(this.n,3)),e.setAttribute(`uv`,new H(this.uv,2)),e}};function pp(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t/2}function J(e,t,n,r,{cap:i=!0,base:a=!1,sides:o=!0,uvScale:s=.3}={}){n||=e,pp(e)<0&&(e=e.slice().reverse(),n=n.slice().reverse());let c=new fp,l=e.length,u=e.reduce((e,t)=>e+t[0],0)/l,d=e.reduce((e,t)=>e+t[1],0)/l;if(o){let i=0;for(let a=0;a<l;a++){let o=(a+1)%l,f=new G(e[a][0],t,e[a][1]),p=new G(e[o][0],t,e[o][1]),m=new G(n[o][0],r,n[o][1]),h=new G(n[a][0],r,n[a][1]),g=f.clone().add(p).add(m).add(h).multiplyScalar(.25),_=new G(g.x-u,0,g.z-d),v=new G().subVectors(p,f),y=new G(v.z,0,-v.x);y.dot(_)<0&&_.lengthSq()>1e-6&&y.negate();let b=v.length();c.quad(f,p,m,h,y.lengthSq()>0?y:_,[[i*s,t*s],[(i+b)*s,t*s],[(i+b)*s,r*s],[i*s,r*s]]),i+=b}}let f=(e,t,n)=>{let r=e.map(e=>new z(e[0],e[1])),i=ka.triangulateShape(r,[]),a=new G(0,n?1:-1,0);for(let n of i){let[r,i,o]=n.map(n=>new G(e[n][0],t,e[n][1]));c.tri(r,i,o,a,n.map(t=>[e[t][0]*s,e[t][1]*s]))}};return i&&f(n,r,!0),a&&f(e,t,!1),c.geo()}function mp(e,t,n,r=0,i=0){let a=e/2,o=t/2,s=Math.min(n,a*.95,o*.95);return[[r-a+s,i-o],[r+a-s,i-o],[r+a,i-o+s],[r+a,i+o-s],[r+a-s,i+o],[r-a+s,i+o],[r-a,i+o-s],[r-a,i-o+s]]}function Y(e,t,n=t,r=0,i=0){return e.map(e=>[r+(e[0]-r)*t,i+(e[1]-i)*n])}function hp(e,t,n=0,r=0,i=0,a=1,o=1){let s=[];for(let c=0;c<e;c++){let l=i+c/e*K*2;s.push([n+Math.cos(l)*t*a,r+Math.sin(l)*t*o])}return s}function gp(e,t,n,r,i=.15,a=0,o=0,s=0,c){let l=mp(e,t,i,o,s);return J(l,n,a?mp(Math.max(.05,e-a*2),Math.max(.05,t-a*2),Math.max(.01,i-a*.4),o,s):l,r,c)}function _p(e,t,n){let r=e.length,i=e[0].length,a=[],o=[],s=[];for(let t=0;t<r;t++)for(let s=0;s<i;s++){let c=e[t][s];a.push(c.x,c.y,c.z);let l=n?n(c,t,s):[s/(i-1),t/(r-1)];o.push(l[0],l[1])}let c=null;for(let n=0;n<r-1;n++)for(let r=0;r<i-1;r++){let a=n*i+r,o=a+1,l=a+i,u=l+1;if(c===null){let i=e[n][r],a=e[n][r+1],o=e[n+1][r+1],s=new G().crossVectors(new G().subVectors(a,i),new G().subVectors(o,i));s.lengthSq()>1e-10&&(c=typeof t==`function`?s.dot(t(i))<0:s.dot(t)<0)}s.push(a,o,u,a,u,l)}if(c)for(let e=0;e<s.length;e+=3){let t=s[e+1];s[e+1]=s[e+2],s[e+2]=t}let l=new Mr;return l.setAttribute(`position`,new H(a,3)),l.setAttribute(`uv`,new H(o,2)),l.setIndex(s),l.computeVertexNormals(),l}var vp={L:20,B:4,D:1.5,F:1.6,bulwark:.1,rail:.08,sheerF:.6,sheerA:.1,transom:.4,bowP:1.7,sternP:2.2,uMax:.45,rake:.2,rakeCurve:0,overhang:.3,flareBow:.2,flareMid:0,nMid:3.5,nBow:1.5,nStern:2.5,forefoot:.35,sternRise:.3,ram:0,camber:.04,nu:44,nLow:7,rowStep:.35,hullMat:`steel`,bottomColor:8137252,bands:null,deckMat:`teak`,deckColor:16777215,deckUV:.25,sideUV:[1/6,1/5],railColor:null,deckInset:0};function yp(e,t){let n={...vp,...t},{L:r,B:i,D:a,F:o}=n,s=e=>o+n.bulwark+n.sheerF*tp(.45,1,e)**2+n.sheerA*tp(.4,0,e)**2,c=e=>s(e)-n.bulwark,l=e=>{if(e>=n.uMax){let t=(e-n.uMax)/(1-n.uMax);return Math.max(0,1-t**+n.bowP)}let t=(n.uMax-e)/n.uMax;return 1-(1-n.transom)*t**+n.sternP},u=e=>i/2*l(e),d=e=>n.flareMid+n.flareBow*tp(.45,1,e),f=e=>a*(1-n.forefoot*tp(.7,1,e))*(1-n.sternRise*tp(.25,0,e)),p=e=>e>.5?ep(n.nMid,n.nBow,tp(.5,1,e)):ep(n.nMid,n.nStern,tp(.4,0,e)),m=s(1),h=s(0),g=e=>r/2-n.rake*(m-e)-n.rakeCurve*Math.max(0,m-e)**2/(m+a)+n.ram*Math.exp(-(((e+.45*a)/(.3*a))**2)),_=e=>-r/2+n.overhang*(h-e),v=(e,t)=>ep(_(t),g(t),e),y=(e,t)=>u(e)*(1+d(e)*$f(t/s(e),0,1)**1.5),b=(e,t)=>{let n=2/p(e),r=u(e)*Math.sin(t)**+n,i=-f(e)*Math.max(0,Math.cos(t))**+n;return new G(r,i,v(e,i))},x=(e,t)=>new G(y(e,t),t,v(e,t)),S=(e,t,n,r,i)=>{let a=.001,o=(i-r)*.001,s=$f(t-a,0,1),c=$f(t+a,0,1),l=$f(n-o,r,i),u=$f(n+o,r,i),d=e(c,n).sub(e(s,n)),f=e(t,u).sub(e(t,l)),p=new G().crossVectors(f,d);return p.lengthSq()<1e-14?new G(1,0,0):p.normalize()},C=[];for(let e=0;e<=n.nu;e++){let t=e/n.nu;C.push(.45*t+.55*(.5-.5*Math.cos(K*t)))}let[w,T]=n.sideUV,E=(e,t,n,r)=>{let i=[],a=[],o=[],s=[],c=C.length;for(let s=0;s<e.length;s++)for(let l=0;l<c;l++){let c=C[l],u=e[s](c),d=t(c,u),f=S(t,c,u,n(c),r(c));i.push(d.x,d.y,d.z),a.push(f.x,f.y,f.z),o.push(d.z*w,d.y*T)}for(let t=0;t<e.length-1;t++)for(let e=0;e<c-1;e++){let n=t*c+e,r=n+1,i=n+c,a=i+1;s.push(n,a,r,n,i,a)}let l=new Mr;return l.setAttribute(`position`,new H(i,3)),l.setAttribute(`normal`,new H(a,3)),l.setAttribute(`uv`,new H(o,2)),l.setIndex(s),l},D=(t,n,r)=>{let i=e.add(t,n,r);e.addRaw(t,ap(i))},O=[];for(let e=0;e<=n.nLow;e++){let t=e/n.nLow*K/2;O.push(()=>t)}D(n.hullMat,E(O,b,()=>0,()=>K/2),n.bottomColor);let k=n.bands||[{to:-1e-4,mat:n.hullMat,color:16777215}],A=(e,t)=>e<0?s(t)+e:Math.min(e,s(t)),ee=()=>0;k.forEach((e,t)=>{let r=ee,i=t===k.length-1?e=>s(e):t=>A(e.to,t),a=i(.5)-r(.5),o=Math.max(2,Math.ceil(a/n.rowStep)+1),c=[];for(let e=0;e<o;e++){let t=e/(o-1);c.push(e=>ep(r(e),i(e),t))}D(e.mat||n.hullMat,E(c,x,()=>0,e=>s(e)),e.color??16777215),ee=i});let j=e=>y(e,s(e)),te=e=>(n.bulwark>0?Math.max(0,Math.min(j(e),y(e,c(e)))-n.rail):j(e))-n.deckInset;{let t=[-1,-.5,0,.5,1],r=C.map(e=>t.map(t=>{let r=Math.max(0,te(e)),i=c(e)+n.camber*(1-t*t)-(n.bulwark,0);return new G(t*r,i,v(e,c(e)))}));e.add(n.deckMat,_p(r,new G(0,1,0),e=>[e.z*n.deckUV,e.x*n.deckUV]),n.deckColor)}if(n.bulwark>0){let e=[],t=[];for(let r of C){let i=s(r),a=c(r)-.02,o=j(r),l=Math.max(0,o-n.rail),u=Math.max(0,te(r)),d=v(r,i),f=v(r,c(r));e.push([new G(o,i,d),new G(l,i,d)]),t.push([new G(l,i,d),new G(u,a,f)])}let r=e=>[e.map(e=>e[0]),e.map(e=>e[1])],i=n.railColor??k[k.length-1].color??16777215,a=k[k.length-1].mat||n.hullMat;D(a,_p(r(e),new G(0,1,0),e=>[e.z*w,e.x*T]),i),D(a,_p(r(t),new G(-1,.2,0),e=>[e.z*w,e.y*T]),i)}if(n.transom>.02){let t=[];for(let e=0;e<=n.nLow;e++)t.push(b(0,e/n.nLow*K/2));let r=s(0);for(let e=1;e<=6;e++)t.push(x(0,e/6*r));t.concat(t.slice(1,-1).reverse().map(e=>new G(-e.x,e.y,e.z))).push(new G(-t[t.length-1].x,r,t[t.length-1].z));let i=t.concat([new G(-t[t.length-1].x,r,t[t.length-1].z)]).concat(t.slice(1,-1).reverse().map(e=>new G(-e.x,e.y,e.z))),a=i.map(e=>new z(e.x,e.y)),o=ka.triangulateShape(a,[]),l=new fp,u=new G(0,0,-1);for(let e of o)l.tri(i[e[0]],i[e[1]],i[e[2]],u,e.map(e=>[i[e].x*w,i[e].y*T]));let d=k.find(e=>!e.mat||e.mat===n.hullMat)||k[0];if(e.add(n.hullMat,l.geo(),n.transomColor??(k.length>1?k[1].color??16777215:d.color??16777215)),n.bulwark>0){let t=Math.max(0,j(0)-n.rail),i=_(r)+n.rail,a=new fp;a.quad(new G(-t,c(0)-.02,i),new G(t,c(0)-.02,i),new G(t,r,i),new G(-t,r,i),new G(0,0,1)),a.quad(new G(-j(0),r,_(r)),new G(j(0),r,_(r)),new G(t,r,i),new G(-t,r,i),new G(0,1,0)),e.add(n.hullMat,a.geo(),n.railColor??k[k.length-1].color??16777215)}}let M=C.map(e=>({u:e,z:v(e,c(e)),y:c(e),half:Math.max(0,te(e)),top:s(e),outer:j(e)})),ne=e=>{if(e<=M[0].z)return{...M[0]};for(let t=1;t<M.length;t++)if(M[t].z>=e){let n=M[t-1],r=M[t],i=(e-n.z)/(r.z-n.z||1);return{u:ep(n.u,r.u,i),z:e,y:ep(n.y,r.y,i),half:ep(n.half,r.half,i),top:ep(n.top,r.top,i),outer:ep(n.outer,r.outer,i)}}return{...M[M.length-1]}};return{spec:n,deckAt:ne,sideAt(e,t,n=1){let r=ne(e).u,i=x(r,t),a=S(x,r,t,0,s(r));return{p:new G(n*i.x,i.y,i.z),n:new G(n*a.x,a.y,a.z)}},zBowDeck:g(s(1)),zSternDeck:_(s(0)),zBowWL:g(0),zSternWL:_(0),topY:s,deckY:c,xUp:y,zAt:v}}function bp(e,t,n,r,i,a,o,s=[0,0,1,1],c=8,l=6,u){let d=u||((e,t)=>(1-e*e)*Math.sin(t*K*.6)**.85),f=a=>{let o=[],u=[],f=[];for(let f=0;f<=l;f++)for(let p=0;p<=c;p++){let m=p/c,h=f/l,g=new G().lerpVectors(e,t,m),_=new G().lerpVectors(n,r,m),v=new G().lerpVectors(g,_,h);v.addScaledVector(i,a*d(m*2-1,h,m)),o.push(v.x,v.y,v.z),u.push(ep(s[0],s[2],m),ep(s[3],s[1],h))}for(let e=0;e<l;e++)for(let t=0;t<c;t++){let n=e*(c+1)+t,r=n+1,i=n+c+1,a=i+1;f.push(n,i,r,r,i,a)}let p=new Mr;return p.setAttribute(`position`,new H(o,3)),p.setAttribute(`uv`,new H(u,2)),p.setIndex(f),p.computeVertexNormals(),p},p=f(a),m=f(o),h=p.attributes.normal;if(h.getX(Math.floor(h.count/2))*i.x+h.getY(Math.floor(h.count/2))*i.y+h.getZ(Math.floor(h.count/2))*i.z<0)for(let e of[p,m]){let t=e.attributes.normal.array;for(let e=0;e<t.length;e++)t[e]=-t[e]}let g=m.attributes.position.array.slice(),_=m.attributes.normal.array.slice(),v=p.attributes.position.array,y=p.attributes.normal.array;for(let e=0;e<g.length;e++)g[e]-=v[e],_[e]-=y[e];p.morphAttributes.position=[new H(g,3)],p.morphAttributes.normal=[new H(_,3)],p.morphTargetsRelative=!0;let b=p.attributes.position.count;return p.setAttribute(`color`,new H(new Float32Array(b*3).fill(1),3)),p}function xp(e,t,n,r,i,a=0,o=.18,s=1.3,c=-1){let l=[],u=[],d=[],f=[],p=[];for(let d=0;d<=3;d++)for(let m=0;m<=10;m++){let h=m/10,g=d/3,_=i*(1-a*h);l.push(e,t-(i-_)*.5-g*_,n+c*h*r),u.push(h,1-g);let v=h*s*K*2,y=o*r*h;f.push(y*Math.sin(v),0,0),p.push(y*Math.cos(v),0,0)}for(let e=0;e<3;e++)for(let t=0;t<10;t++){let n=e*11+t,r=n+1,i=n+10+1,a=i+1;d.push(n,i,r,r,i,a)}let m=new Mr;return m.setAttribute(`position`,new H(l,3)),m.setAttribute(`uv`,new H(u,2)),m.setIndex(d),m.computeVertexNormals(),m.setAttribute(`color`,new H(new Float32Array(l.length).fill(1),3)),m.morphAttributes.position=[new H(f,3),new H(p,3)],m.morphTargetsRelative=!0,m}function Sp(e,t,n,r){if(!t.length)return null;let i=t.length===1?t[0]:vd(t,!1);if(!i)return console.warn(`[models] cloth merge failed for`,r),null;i.morphTargetsRelative=!0,i.computeBoundingSphere(),i.boundingSphere.radius*=1.3;let a=new ni(i,rp);return a.userData.mat=n,a.userData.rig=r,a.castShadow=!0,a.receiveShadow=!0,a.name=r,a.morphTargetInfluences=Array(i.morphAttributes.position.length).fill(0),e.add(a),a}var X={hull:8029068,hullDark:5857899,sup:10134443,supLight:11778752,dark:4541266,black:1908514,gun:7173759,deckSteel:5988969,red:8137252,boot:1776928,white:15000799,buff:13149286,navy:4017246,woodDark:6967616,woodMid:11045484,woodPale:14206118,rope:2761244,copper:13928538,ironBlack:2763824,graphite:5002075,graphiteDark:3159355,olive:7239008},Cp=new Set([`steel`,`iron`,`stealth`,`stealthDark`,`rubber`,`paint`,`darksteel`]);function wp(e,t){return Cp.has(e)?Ep(e):Xf(e,t,!0)}var Tp=new Map;function Ep(e){let t=Tp.get(e);return t||(t=Xf(e,-1,!0).clone(),t.color.set(16777215),t.name=e+`:vcwhite`,Tp.set(e,t)),t}function Dp(e,t,{x:n=0,y0:r,z:i,h:a,rx:o,rz:s,rake:c=.08,body:l=X.sup,band:u=!0,cap:d=X.black,bandMat:f=`team`,mat:p=`steel`}){let m=Math.tan(c),h=new tn().set(1,0,0,0,0,1,0,0,0,-m,1,0,0,0,0,1),g=(t,a,c,l,u=1)=>{let d=new Ki(1,1,a-t,20,1,!0);d.applyMatrix4(new tn().makeScale(o*u,1,s*u)),d.translate(0,(t+a)/2,0),d.applyMatrix4(h),d.translate(n,r,i),e.add(c,d,l)},_=u?a*.72:a*.86;g(-.3,_,p,l),u&&g(_,a*.86,f,16777215,1),g(a*.86,a,p,d,1);let v=new Ra(1,.06,4,20);v.rotateX(K/2),v.applyMatrix4(new tn().makeScale(o,1,s)),v.translate(0,a,0),v.applyMatrix4(h),v.translate(n,r,i),e.add(p,v,X.black);let y=new Gi(1,20);y.rotateX(-K/2),y.applyMatrix4(new tn().makeScale(o*.98,1,s*.98)),y.translate(0,a-.25,0),y.applyMatrix4(h),y.translate(n,r,i),e.add(p,y,657930),e.rod(p,.05,.05,[n+o*.7,r+.3,i-s*.9-m*.3],[n+o*.7,r+a+.25,i-s*.9-m*(a+.25)],X.dark,6);let b=new kn;return b.position.set(n,r+a+.1,i-m*a),b.userData.rig=`stack`,t.add(b),b}function Op(e,t,n,r,i,a={}){let o=new kn;return o.position.set(n,r,i),o.userData.rig=t,Object.assign(o.userData,a),e.add(o),o}function kp(e,t,{style:n=`battle`,x:r=0,y:i=0,z:a=0,ry:o=0,w:s=2,l:c=2.4,h:l=.8,n:u=2,blen:d=3.5,br:f=.11,sp:p=.6,teamRoof:m=!0,scale:h=1}){let g=new kn;g.position.set(r,i,a),g.rotation.y=o,g.userData.rig=`turret`,g.userData.idx=t;let _=new op,v=[],y=(e,t,n,r,i,a,o=X.gun,s=!0,c=`steel`)=>{for(let l=0;l<i;l++){let u=(l-(i-1)/2)*a;s&&_.cyl(c,r*1.9,r*2.1,.45,u,e,t+.1,X.dark,10,K/2),_.rod(c,r*1.15,r*.82,[u,e,t],[u,e,t+n],o,10),_.rod(c,r*1.12,r*1.12,[u,e,t+n-.22],[u,e,t+n],X.dark,10),v.push([u,e,t+n+.05])}};if(n===`battle`){let e=[[-s/2,-.55*c],[s/2,-.55*c],[s/2,.22*c],[.34*s,.48*c],[-.34*s,.48*c],[-s/2,.22*c]],t=[[-.46*s,-.5*c],[.46*s,-.5*c],[.46*s,.14*c],[.3*s,.28*c],[-.3*s,.28*c],[-.46*s,.14*c]];_.add(`steel`,J(e,0,t,l),X.sup),_.cyl(`steel`,s*.52,s*.55,.3,0,-.1,0,X.hullDark,20),m&&_.add(`team`,J(Y(t,.82,.82,0,-.1*c),l,null,l+.04,{sides:!0}),16777215),_.box(`steel`,s*1.18,.22,.3,0,l*.7,-.35*c,X.dark),_.box(`steel`,.22,.14,.3,-s*.25,l+.05,.02*c,X.dark),_.box(`steel`,.22,.14,.3,s*.25,l+.05,.02*c,X.dark),y(l*.42,.36*c,d,f,u,p)}else if(n===`gun`){let e=[[-s/2,-.5*c],[s/2,-.5*c],[s/2,.15*c],[.25*s,.5*c],[-.25*s,.5*c],[-s/2,.15*c]],t=[[-.42*s,-.45*c],[.42*s,-.45*c],[.42*s,.05*c],[.2*s,.22*c],[-.2*s,.22*c],[-.42*s,.05*c]];_.add(`steel`,J(e,0,t,l),X.sup),_.cyl(`steel`,s*.5,s*.5,.2,0,-.05,0,X.hullDark,16),m&&_.add(`team`,J(Y(t,.8,.8),l,null,l+.03),16777215),y(l*.45,.3*c,d,f,u,p,X.gun,!1)}else if(n===`cannon`){_.cyl(`iron`,s*.5,s*.55,.14,0,.07,0,X.woodDark,16),_.box(`iron`,s*.55,.28,c*.7,0,.28,-.05,5914672);for(let e=0;e<u;e++){let t=(e-(u-1)/2)*p,n=new Na([[0,-.35],[f*1.7,-.33],[f*1.9,-.1],[f*1.6,.2],[f*1.2,d*.8],[f*1.45,d*.9],[f*1.4,d],[f*.6,d]].map(e=>new z(e[0],e[1])),12);n.rotateX(K/2),_.add(`iron`,n,X.ironBlack,q(t,.5,0)),v.push([t,.5,d+.05])}}else if(n===`rail`){let e=[[-s/2,-.5*c],[s/2,-.5*c],[s*.42,.3*c],[0,.5*c],[-s*.42,.3*c]],t=[[-s*.3,-.45*c],[s*.3,-.45*c],[s*.22,.15*c],[0,.26*c],[-s*.22,.15*c]];_.add(`stealth`,J(e,0,t,l),X.graphite),_.add(`teamGlow`,J(Y(t,.5,.5,0,-.1*c),l,null,l+.03),16777215);let n=l*.5;for(let e of[-1,1])_.box(`stealth`,.2,.34,d,e*.18,n,.2*c+d/2,X.graphiteDark),_.box(`stealth`,.26,.4,.5,e*.21000000000000002,n,.2*c+d*.25,X.graphite),_.box(`stealth`,.26,.4,.5,e*.21000000000000002,n,.2*c+d*.6,X.graphite);_.box(`teamGlow`,.16*.9,.1,d*.96,0,n,.2*c+d/2,16777215),v.push([0,n,.2*c+d+.1])}else if(n===`laser`){let e=new La(s*.5,10,6,0,K*2,0,K/2);_.add(`stealth`,e,X.graphite,q(0,0,0,0,0,0,1,l/(s*.5),1)),_.cyl(`stealth`,s*.52,s*.56,.2,0,0,0,X.graphiteDark,10),_.add(`stealth`,gp(s*.36,c*.5,l*.35,l*.8,.05,.03,0,c*.3),X.graphiteDark),_.rod(`stealth`,f*1.6,f*1.2,[0,l*.6,c*.3],[0,l*.6,c*.3+d],X.graphiteDark,8),_.cyl(`teamGlow`,f*1.3,f*1.3,.12,0,l*.6,c*.3+d,16777215,8,K/2),_.add(`teamGlow`,new Ra(s*.5,.04,4,16),16777215,q(0,.12,0,K/2)),v.push([0,l*.6,c*.3+d+.12])}else if(n===`missile`){_.cyl(`steel`,s*.4,s*.45,.25,0,.1,0,X.hullDark,12),_.box(`steel`,s*.25,.5,.5,0,.45,0,X.dark);let e=s,t=l*.6,n=c;_.add(`steel`,new Of(e,t,n,1,.05),X.sup,q(0,l*.75,0,-.35,0,0));for(let t=0;t<u;t++){let r=(t-(u-1)/2)*(e/u),i=l*.75+Math.sin(.35)*n/2,a=Math.cos(.35)*n/2+.01;_.add(`steel`,new Gi(e/u*.36,10),X.black,q(r,i,a,-.35)),v.push([r,i+.1,a+.2])}}else if(n===`twin5`){let e=mp(s,c,s*.3,0,-.05*c),t=mp(s*.84,c*.8,s*.25,0,-.1*c);_.add(`steel`,J(e,0,t,l),X.sup),m&&_.add(`team`,J(Y(t,.7,.7,0,-.1*c),l,null,l+.03),16777215),y(l*.5,.35*c,d,f,u,p,X.gun,!1)}return _.build(g),g.scale.setScalar(h),v.forEach((e,n)=>Op(g,`muzzle`,e[0],e[1],e[2],{turret:t,i:n})),e.add(g),g}function Ap(e,{x:t,y:n,z:r,style:i=`bed`,size:a=1,speed:o=2.2,mat:s=`steel`,col:c=X.dark}){let l=new kn;l.position.set(t,n,r),l.userData.rig=`spin`,l.userData.speed=o;let u=new op;if(i===`bed`){u.cyl(s,.05*a,.07*a,.4*a,0,.2*a,0,c,6),u.box(s,1.6*a,.7*a,.08*a,0,.6*a,.1*a,c);for(let e=-3;e<=3;e++)u.box(s,.03*a,.78*a,.14*a,e*.24*a,.6*a,.12*a,X.black)}else if(i===`bar`)u.cyl(s,.06*a,.08*a,.3*a,0,.15*a,0,c,6),u.box(s,1.8*a,.16*a,.2*a,0,.36*a,0,c),u.box(s,1.7*a,.06*a,.24*a,0,.36*a,.02*a,X.black);else if(i===`dish`){let e=new La(.6*a,12,6,0,K*2,0,K*.35);u.add(s,e,c,q(0,.55*a,.2*a,K/2+.3,0,0)),u.cyl(s,.05*a,.07*a,.5*a,0,.25*a,0,c,6)}else i===`ring`&&(u.add(s,new Ki(.5*a,.6*a,.3*a,8,1),c,q(0,.15*a,0)),u.add(`teamGlow`,new Wi(.9*a,.06*a,.1*a),16777215,q(0,.32*a,.42*a)),u.box(s,1.4*a,.1*a,.3*a,0,.4*a,0,c));return u.build(l),e.add(l),l}function jp(e,t,n,r,i,{r:a=.07,yard:o=1.4,yardY:s=.75,col:c=X.dark,top:l=!0,mat:u=`steel`}={}){e.rod(u,a,a*.5,[t,n,r],[t,n+i,r],c,6),o&&e.rod(u,a*.5,a*.5,[t-o/2,n+i*s,r],[t+o/2,n+i*s,r],c,5),l&&e.sphere(`lantern`,a*.9,t,n+i+a*.4,r,16777215,6,4)}function Mp(e,t,n,r,i,a=X.white,o=0,s=`steel`){let c=new op;yp(c,{L:i,B:i*.32,D:i*.12,F:i*.1,bulwark:.05,rail:.03,sheerF:.05,sheerA:.05,transom:.5,bowP:1.8,sternP:2,rake:.3,overhang:.2,nu:14,nLow:3,rowStep:1,hullMat:s,bottomColor:a,bands:[{to:-1e-4,color:a}],deckMat:s,deckColor:X.woodMid,camber:0});let l=q(t,n+i*.12,r,0,o,0);for(let[t,n]of c.map)for(let r of n)r.applyMatrix4(l),e.addRaw(t,r)}function Np(e,t,n,r,i=0,a=1){e.add(`steel`,new Ki(.42*a,.46*a,.3*a,10,1,!0),X.sup,q(t,n+.15*a,r)),e.cyl(`steel`,.4*a,.4*a,.05,t,n+.03,r,X.deckSteel,10),e.box(`steel`,.36*a,.22*a,.3*a,t,n+.3*a,r,X.dark,0,i);for(let o=0;o<4;o++){let s=(o-1.5)*.08*a,c=Math.cos(i),l=Math.sin(i);e.rod(`steel`,.025*a,.02*a,[t+s*c,n+.35*a,r-s*l],[t+s*c+l*.7*a,n+.55*a,r-s*l+c*.7*a],X.black,5)}}function Pp(e,t,n,r,i,a=1){let o=gp(.7*a,.8*a,0,.35*a,.18*a,.05*a);e.add(`steel`,o,X.sup,q(t,n,r,0,i));let s=Math.cos(i),c=Math.sin(i);for(let i of[-.12*a,.12*a])e.rod(`steel`,.04*a,.035*a,[t+i*s+c*.3*a,n+.18*a,r-i*c+s*.3*a],[t+i*s+c*1.2*a,n+.2*a,r-i*c+s*1.2*a],X.gun,6)}function Fp(e,t,n,r,i=0,a=1,o=X.navy,s=!1){let c=q(t,n,r,0,i,0,a),l=(t,n,r)=>e.add(t,n,r,c),u=new Ki(.1,.16,1.5,8);u.rotateX(K/2),l(`steel`,u,o);let d=new La(.16,8,6);d.translate(0,0,.75),l(`steel`,d,X.dark),l(`steel`,new Wi(.1,.02,.5).translate(0,.1,.75),X.black),l(`steel`,new Wi(s?.7:1.8,.05,.38).translate(0,-.02,.2),o),s&&(l(`steel`,new Wi(.05,.55,.32).translate(.36,.25,.2),o),l(`steel`,new Wi(.05,.55,.32).translate(-.36,.25,.2),o)),l(`steel`,new Wi(.62,.04,.22).translate(0,.02,-.62),o),l(`team`,new Wi(.04,.3,.26).translate(0,.17,-.64),16777215),l(`glass`,new La(.09,8,5,0,K*2,0,K/2).scale(1,1,2).translate(0,.1,.25),16777215)}function Ip(e,t,n,r,i,a=0,o=`team`,s=16777215,c=.05){let l=Math.max(2,Math.ceil(Math.abs(r-n)/1.2));for(let u=0;u<l;u++){let d=ep(n,r,u/l),f=ep(n,r,(u+1)/l),p=t.deckAt((d+f)/2),m=t.spec.camber*(1-(a/Math.max(.1,p.half))**2);e.box(o,i,c,Math.abs(f-d)+.02,a,p.y+m+c/2+.005,(d+f)/2,s)}}function Lp(e,t,n,r,i,a=.35,o=.5,s=`team`){for(let c=0;c<r;c++){let l=n+(c-(r-1)/2)*i,u=t.deckAt(l),d=u.half*2/Math.cos(o)*.92;e.box(s,d,.05,a,0,u.y+t.spec.camber*.5+.04,l,16777215,0,o,0)}}function Rp(e,t,n,r,i=1,a=0){e.cyl(`steel`,.09*i,.09*i,.6*i,t,n+.3*i,r,X.sup,8);let o=new Ra(.14*i,.08*i,6,8,K/2);e.add(`steel`,o,X.sup,q(t,n+.6*i,r+.14*i,0,a+K/2,0)),e.add(`rubber`,new Gi(.08*i,8),526344,q(t,n+.74*i,r+.141*i+.14*i,0,a))}function zp(){let e=new An;return new An,{root:e,P:new op,sails:[],flags:[],turretCount:0}}function Bp(e,t){let{root:n,P:r}=e;return r.build(n),Sp(n,e.sails,`sail`,`sails`),Sp(n,e.flags,`flag`,`flag`),n.userData.info=t,n}function Vp(e,{L:t=14.6,scale:n=1,masts:r=3,creep:i=!1}={}){let{root:a,P:o}=e,s=t/4.4,c=yp(o,{L:t,B:s,D:t*.09,F:t*.1,bulwark:t*.035,rail:t/14.6*.1,sheerF:t*.06,sheerA:t*.07,transom:.62,bowP:2.1,sternP:2.8,uMax:.42,rake:.25,rakeCurve:.9,overhang:.28,flareBow:.15,flareMid:-.1,nMid:2.6,nBow:1.5,nStern:2.2,forefoot:.1,sternRise:.2,camber:.06,hullMat:`wood`,bottomColor:X.copper,deckMat:i?`wood`:`teak`,deckColor:i?X.woodPale:16777215,sideUV:[1/5,1/4.2],bands:[{to:t*.012,color:4864556},{to:t*.038,color:16777215},{to:t*.075,mat:`team`,color:16777215},{to:t*.082,color:3811871},{to:-1e-4,color:9071184}],railColor:5914672}),l=t/14.6,u=i?`wood`:`iron`,d=i?`wood`:`lantern`;c.deckAt(0);let f=[],p=i?3:6,m=t*.057;for(let e=0;e<p;e++){let n=ep(-t*.28,t*.28,p===1?.5:e/(p-1));for(let e of[-1,1]){let t=c.sideAt(n,m,e),r=Math.atan2(t.n.x,t.n.z);o.box(u,.42*l,.36*l,.1,t.p.x+t.n.x*.02,m,t.p.z+t.n.z*.02,1052688,0,r);let s=t.p.clone().addScaledVector(t.n,.55*l);o.rod(i?`wood`:`iron`,.08*l,.07*l,[t.p.x-t.n.x*.2,m,t.p.z-t.n.z*.2],[s.x,m,s.z],i?3158064:X.ironBlack,8),f.push(Op(a,`broadside`,s.x+t.n.x*.05,m,s.z+t.n.z*.05,{side:e})),i||o.box(`team`,.44*l,.05,.3*l,t.p.x+t.n.x*.15,m+.24*l,t.p.z+t.n.z*.15,16777215,0,r)}}let h=c.zSternDeck,g=h+.08,_=h+t*.24,v=t*.06,y=[];for(let e=0;e<=8;e++){let t=ep(g,_,e/8),n=c.deckAt(t);y.push([n.half+c.spec.rail*.5,t])}for(let e=8;e>=0;e--){let t=ep(g,_,e/8),n=c.deckAt(t);y.push([-(n.half+c.spec.rail*.5),t])}let b=c.deckAt(_).y-.05,x=c.deckAt(g).y+v;o.add(`wood`,J(y,b,null,x,{cap:!1}),9071184),o.add(i?`wood`:`teak`,J(Y(y,.97,1,0,0),x-.02,null,x,{sides:!1}),i?X.woodPale:16777215);let S=Y(y,1,1);for(let e=0;e<S.length-1;e++){if(e===8)continue;let t=S[e],n=S[e+1];o.rod(`wood`,.04*l,.04*l,[t[0],x+.35*l,t[1]],[n[0],x+.35*l,n[1]],4863012,5)}for(let e=0;e<S.length;e+=2)o.rod(`wood`,.03*l,.03*l,[S[e][0],x,S[e][1]],[S[e][0],x+.35*l,S[e][1]],4863012,4);o.box(`wood`,.5*l,.6*l,.05,0,b+.35*l,_+.02,3811868);let C=c.deckAt(g).half*1.6,w=c.zAt(0,x-v*.45)-.03;for(let e=0;e<(i?3:5);e++){let t=i?3:5,n=(e-(t-1)/2)*(C/t);o.box(d,C/t*.62,v*.35,.06,n,x-v*.45,w-.02,16777215),o.box(`wood`,C/t*.12,v*.5,.1,n+C/t*.5,x-v*.45,w-.03,3811868)}if(o.box(`wood`,C*1.05,.08*l,.4*l,0,x-v*.8,w-.2*l,5914672),i)o.add(d,new Pa(.16*l,0),16777215,q(0,x+.55*l,g+.2,0,0,0,1,1.4,1)),o.rod(`wood`,.03,.03,[0,x,g+.2],[0,x+.4*l,g+.2],3153944,4);else for(let[e,t]of[[0,1.25],[-C*.45,1],[C*.45,1]]){let n=g+.25;o.rod(u,.03,.03,[e,x,n],[e,x+.7*t*l,n],X.ironBlack,5),o.add(d,new Pa(.17*t*l,0),16777215,q(e,x+.85*t*l,n,0,0,0,1,1.4,1)),o.cyl(`brass`,.02,.12*t*l,.12*l,e,x+1.07*t*l,n,16777215,6)}let T=e=>c.deckAt(e).y+c.spec.camber;if(o.box(`wood`,1*l,.22*l,1.1*l,0,T(t*.19)+.1*l,t*.19,5914672),o.box(u,.8*l,.05,.9*l,0,T(t*.19)+.22*l,t*.19,1709072),o.box(`wood`,1.2*l,.22*l,1.4*l,0,T(-t*.12)+.1*l,-t*.12,5914672),o.box(u,1*l,.05,1.2*l,0,T(-t*.12)+.22*l,-t*.12,1709072),o.cyl(`wood`,.22*l,.28*l,.5*l,0,T(-t*.2)+.25*l,-t*.2,6965812,10),!i){Mp(o,0,T(-t*.01),-t*.01+.2,2.1*l,6965812,0,`wood`),o.add(`wood`,new Ra(.28,.04,5,12),4861984,q(0,x+.4,_-.5));for(let e of[-1,1])for(let n of[t*.33,-t*.34]){let r=e*(c.deckAt(n).half-.45*l),i=n<-t*.2?x:T(n);o.box(`wood`,.35*l,.2*l,.5*l,r,i+.1*l,n,5914672),o.rod(u,.08*l,.07*l,[r,i+.28*l,n],[r+e*.7*l,i+.3*l,n],X.ironBlack,8)}}let E=r===3?[{z:t*.27,h:t*.72,s:.9},{z:t*.02,h:t*.82,s:1},{z:-t*.235,h:t*.6,s:.76,spanker:!0}]:r===2?[{z:t*.2,h:t*.78,s:.95},{z:-t*.1,h:t*.82,s:1,spanker:!0}]:[{z:t*.08,h:t*.9,s:1,spanker:!0}],D=t*.46,O=[];for(let n of E){let r=T(n.z)-.05,a=n.h;o.rod(`wood`,.17*l,.1*l,[0,r-.3,n.z],[0,r+a*.58,n.z],6965812,10),o.rod(`wood`,.1*l,.05*l,[0,r+a*.55,n.z],[0,r+a,n.z],6965812,8),o.box(`wood`,.9*l*n.s,.08,.7*l*n.s,0,r+a*.56,n.z-.05,4863012),o.box(`wood`,.5*l*n.s,.05,.3*l*n.s,0,r+a*.84,n.z,4863012);let s=[.28,.54,.79].map(e=>r+a*e),u=[D*n.s,D*n.s*.8,D*n.s*.58],d=[r+a*.07,s[0]+.1,s[1]+.1],f=+!!n.spanker;for(let t=0;t<3;t++){if(o.rod(`wood`,.07*l,.07*l,[-u[t]/2,s[t],n.z+.12],[u[t]/2,s[t],n.z+.12],3811868,6),t<f)continue;let r=u[t]*.93,a=t===0?u[0]*1.02:u[t-1]*.95,c=s[t]-.05,p=d[t],m=!i&&n.s===1&&t===0||i&&t===f,h=n.z+.2;e.sails.push(bp(new G(-r/2,c,h),new G(r/2,c,h),new G(-a/2,p,h+.15),new G(a/2,p,h+.15),new G(0,0,1),.25*l,.95*l*(t===0?1.1:.9),m?[.5,0,1,1]:[0,0,.5,1],8,6))}if(n.spanker){let i=r+a*.07,s=r+a*.5,c=t*.2*n.s;o.rod(`wood`,.06*l,.05*l,[0,i+.4,n.z-.15],[0,i+.35,n.z-c-.3],3811868,6),o.rod(`wood`,.05*l,.04*l,[0,s,n.z-.15],[0,s+.9*l,n.z-c],3811868,6),e.sails.push(bp(new G(0,s-.1,n.z-.2),new G(0,s+.8*l,n.z-c),new G(0,i+.5,n.z-.2),new G(0,i+.45,n.z-c-.2),new G(-1,0,0),.15*l,.55*l,[.02,.05,.48,.95],6,6,(e,t,n)=>Math.sin(K*n)*Math.sin(K*$f(t,0,1))+0))}let p=c.deckAt(n.z);for(let e of[-1,1])for(let t of[-.35,0,.35])o.rod(`wood`,.022*l,.022*l,[e*(p.outer+.1),p.top-.05,n.z+t*l-.3],[e*.18*l,r+a*.55,n.z-.05],X.rope,3);O.push({z:n.z,y:r+a,base:r,H:a})}for(let e=0;e<O.length-1;e++)o.rod(`wood`,.025*l,.025*l,[0,O[e+1].y-.2,O[e+1].z],[0,O[e].base+O[e].H*.56,O[e].z],X.rope,3);let k=c.zBowDeck,A=c.deckAt(k-.3).y+.2,ee=new G(0,A+1.3*l,k+2.4*l);o.rod(`wood`,.12*l,.06*l,[0,A-.25,k-1.4*l],[ee.x,ee.y,ee.z],4863012,8),o.add(`wood`,new qi(.2*l,.8*l,8),14200944,q(0,A-.25*l,k+.05,.9,0,0));let j=O[0];o.rod(`wood`,.025*l,.025*l,[ee.x,ee.y,ee.z],[0,j.base+j.H*.8,j.z],X.rope,3),e.sails.push(bp(new G(0,j.base+j.H*.62,j.z+.2),new G(0,j.base+j.H*.62,j.z+.2),new G(0,A+.35,j.z+.6*l),new G(0,ee.y-.05,ee.z-.15),new G(1,0,0),.12*l,.5*l,[.02,.05,.48,.95],6,6,(e,t,n)=>Math.sin(K*$f(t,0,1))*Math.sin(K*n)*t)),i||e.sails.push(bp(new G(0,j.base+j.H*.52,j.z+.25),new G(0,j.base+j.H*.52,j.z+.25),new G(0,A+.3,j.z+.4*l),new G(0,A+.75*l,k+.9*l),new G(-1,0,0),.1*l,.4*l,[.02,.05,.48,.95],6,5,(e,t,n)=>Math.sin(K*$f(t,0,1))*Math.sin(K*n)*t));let te=O[Math.min(1,O.length-1)];e.flags.push(xp(0,te.y+.05,te.z-.05,(i?1.6:3.2)*l,.45*l,.85,.12,1.6)),i||(o.rod(`wood`,.04,.03,[0,x,g+.05],[0,x+1.9*l,g-.35*l],4863012,5),e.flags.push(xp(0,x+1.85*l,g-.4*l,1.5*l,.9*l,0,.14,1.1)));let M=[],ne=[t*.36,-t*.1];return i?M.push(kp(a,0,{style:`cannon`,x:0,y:T(ne[0]),z:ne[0],w:.9*l,l:1*l,n:1,blen:1.2*l,br:.09*l})):(M.push(kp(a,0,{style:`cannon`,x:0,y:T(ne[0]),z:ne[0],w:.9*l,l:1*l,n:1,blen:1.25*l,br:.09*l})),M.push(kp(a,1,{style:`cannon`,x:0,y:x,z:_-1.2*l,ry:K,w:.9*l,l:1*l,n:1,blen:1.25*l,br:.09*l}))),Op(a,`engine`,0,.05,c.zSternWL-.1),Op(a,`launch`,0,T(0)+.5,t*.3),{hull:c,length:t+2.4*l,beam:s,height:O[Math.min(1,O.length-1)].y}}function Hp(e){let{root:t,P:n}=e,r=3.5,i=yp(n,{L:17.2,B:r,D:1.5,F:.75,bulwark:.08,rail:.08,sheerF:.05,sheerA:.1,transom:.35,bowP:1.5,sternP:2.2,uMax:.48,rake:-.35,overhang:.35,flareBow:.05,flareMid:.02,nMid:3.6,nBow:1.6,nStern:2.4,forefoot:.05,ram:.9,camber:.03,hullMat:`steel`,bottomColor:X.red,deckMat:`steel`,deckColor:5001042,bands:[{to:.18,color:2105892},{to:.5,color:3356218},{to:-1e-4,mat:`team`,color:16777215}],railColor:2763823,sideUV:[1/5,1/5]}),a=e=>i.deckAt(e).y,o=4.6,s=2.9,c=a(0)-.02,l=1.5,u=[[-2.9/2,-4.4],[-.85,-5],[s/2-.6,-5],[s/2,-4.4],[s/2,3.5999999999999996],[s/2-.9,o],[-2.9/2+.9,o],[-2.9/2,3.5999999999999996]],d=l/Math.tan(.62),f=s/2-d*.5,p=[[-f,-4.1],[-f+.4,-4.4],[f-.4,-4.4],[f,-4.1],[f,3.3],[f-.5,3.8499999999999996],[-f+.5,3.8499999999999996],[-f,3.3]];n.add(`steel`,J(u,c,p,c+l,{cap:!1}),4014405),n.add(`steel`,J(p,c+l-.01,null,c+l+.02,{sides:!1}),2763823);for(let e=-3.9;e<3.3999999999999995;e+=.45)n.box(`iron`,f*2-.2,.04,.08,0,c+l+.03,e,1710618);let m=Math.atan2(l,d*.5);for(let e of[-1,1])for(let r=0;r<4;r++){let i=ep(-3.4,2.5999999999999996,r/3),a=e*(s/2-d*.25),o=c+l*.5;n.box(`iron`,.1,.36,.5,a,o,i,657930,0,0,e*(K/2-m)),n.rod(`iron`,.1,.09,[a-e*.2,o,i],[a+e*.7,o-.06,i],X.ironBlack,8),Op(t,`broadside`,a+e*.8,o-.06,i,{side:e})}n.add(`steel`,J(hp(8,.45,0,3.0999999999999996,K/8),c+l,hp(8,.38,0,3.0999999999999996,K/8),c+l+.55),4014405),n.add(`brass`,J(hp(8,.39,0,3.0999999999999996,K/8),c+l+.35,hp(8,.39,0,3.0999999999999996,K/8),c+l+.45,{cap:!1}),16777215),n.add(`steel`,J(hp(8,.3,0,3.0999999999999996,K/8),c+l+.55,hp(8,.05,0,3.0999999999999996,K/8),c+l+.75),2763823);let h=c+l;Dp(n,t,{z:.6,y0:h,h:2.8,rx:.42,rz:.42,rake:.1,body:2895409,cap:1184532}),Dp(n,t,{z:-1.6,y0:h,h:2.5,rx:.4,rz:.4,rake:.1,body:2895409,cap:1184532});for(let e of[-.7,.7]){n.box(`iron`,.5,.12,1.2,e,h+.08,-.5,1710618);for(let t=0;t<4;t++)n.box(`furnace`,.36,.06,.14,e,h+.13,-.95+t*.3,16777215)}Rp(n,.9,h,2,1,0),Rp(n,-.9,h,2,1,0),n.sphere(`brass`,.12,0,h+.2,2.6,16777215,8,6),Mp(n,0,h+.02,-3.4,1.8,8020040,0,`steel`);for(let e of[6.6,-6.4])for(let t of[-.8,.8])n.cyl(`iron`,.1,.12,.25,t,a(e)+.12,e,X.ironBlack,8);return n.box(`iron`,.8,.1,.6,0,a(5.8)+.05,5.8,2434341),jp(n,0,h,-3,3.2,{r:.07,yard:1.3,col:2895409}),e.flags.push(xp(0,h+3.1,-3.1,1.1,.65,0,.16)),n.rod(`steel`,.04,.03,[0,a(-8),-8],[0,a(-8)+1.6,-8.3],2895409,5),e.flags.push(xp(0,a(-8)+1.55,-8.35,1,.6,0,.16)),Lp(n,i,6.3,2,.8,.3,.5),kp(t,0,{style:`cannon`,x:0,y:h+.02,z:2.1999999999999997,w:.95,l:1.1,n:1,blen:1.9,br:.13}),kp(t,1,{style:`cannon`,x:0,y:h+.02,z:-3.7,ry:K,w:.95,l:1.1,n:1,blen:1.9,br:.13}),n.sphere(`lantern`,.1,.5,h+.5,3.0999999999999996,16777215,6,4),n.sphere(`lantern`,.1,-.5,h+.5,3.0999999999999996,16777215,6,4),Op(t,`engine`,0,.05,i.zSternWL),Op(t,`launch`,0,h+.5,0),{hull:i,length:17.8,beam:r,height:h+3.3}}function Up(e=!0,t=!0,n=0){let r=[{to:.28,color:X.boot},{to:t?-.5-n:-1e-4,color:X.hull}];return t&&(r.push({to:-.2,mat:`team`,color:16777215}),r.push({to:-1e-4,color:X.hull})),r}function Wp(e){let{root:t,P:n}=e,r=4.6,i=yp(n,{L:25.6,B:r,D:1.8,F:1.7,bulwark:.12,rail:.06,sheerF:.7,sheerA:.1,transom:.3,bowP:1.6,sternP:2.3,uMax:.47,rake:.04,overhang:.55,flareBow:.22,flareMid:0,nMid:4.2,nBow:1.4,nStern:2.4,forefoot:.12,hullMat:`steel`,bottomColor:X.red,deckMat:`teak`,bands:Up(),railColor:X.hull}),a=e=>i.deckAt(e).y+i.spec.camber;[{z:8.3,lift:0,ry:0},{z:5.2,lift:.95,ry:0},{z:-6.6,lift:.95,ry:K},{z:-9.5,lift:0,ry:K}].forEach((e,r)=>{let i=a(e.z)+e.lift;n.cyl(`steel`,1.08,1.12,e.lift+.35,0,a(e.z)+(e.lift+.35)/2-.2,e.z,X.sup,24),kp(t,r,{style:`battle`,x:0,y:i+.15,z:e.z,ry:e.ry,w:2,l:2.5,h:.85,n:2,blen:4,br:.12,sp:.7})});let o=2.6,s=a(o);n.add(`steel`,gp(2.8,2,s-.05,s+1.1,.4,.05,0,o),X.sup),n.add(`steel`,gp(2,1.3,s+1.1,s+1.9,.3,.05,0,2.8000000000000003),X.supLight),n.add(`glass`,gp(2.02,1.32,s+1.55,s+1.75,.3,0,0,2.8000000000000003,{cap:!1}),16777215),n.box(`steel`,3.4,.08,.5,0,s+1.9,3.1,X.sup),n.add(`steel`,J(hp(8,.55,0,3.55,0),s+1.1,hp(8,.5,0,3.55,0),s+1.65),X.dark);let c=s+1.9,l=s+8.2;n.rod(`steel`,.14,.1,[0,c-1,2],[0,l,2],X.sup,8),n.rod(`steel`,.1,.07,[.9,s,.6000000000000001],[0,l-.3,2],X.sup,6),n.rod(`steel`,.1,.07,[-.9,s,.6000000000000001],[0,l-.3,2],X.sup,6),n.add(`steel`,gp(1.2,1,l-.2,l+.55,.25,.08,0,2),X.supLight),n.add(`glass`,gp(1.22,1.02,l+.15,l+.35,.25,0,0,2,{cap:!1}),16777215),n.rod(`steel`,.06,.04,[0,l+.55,2],[0,l+3,2],X.dark,6),n.rod(`steel`,.04,.04,[-1.1,l+1.9,2],[1.1,l+1.9,2],X.dark,5),n.sphere(`lantern`,.09,0,l+3.05,2,16777215,6,4),e.flags.push(xp(0,l+2.9,1.95,1.3,.75,0,.16));let u=a(-1);n.add(`steel`,gp(2.6,5,u-.05,u+.9,.35,.03,0,-1),X.sup),Dp(n,t,{z:.6,y0:u+.9,h:3.8,rx:.55,rz:.85,rake:.05}),Dp(n,t,{z:-2.3,y0:u+.9,h:3.5,rx:.55,rz:.85,rake:.05});for(let e of[-1,1])for(let t of[-.8,1.6,-3.2])Rp(n,e*.9,u+.9,t,1.1,e>0?0:K);for(let e of[-1.55,1.55])Mp(n,e,a(-1)+.2,-.6,1.9,X.white,0,`steel`),Mp(n,e,a(-1)+.2,-2.8,1.7,6967360,0,`steel`);let d=-4.4,f=a(d);n.add(`steel`,gp(2,1.6,f-.05,f+1,.3,.05,0,d),X.sup),n.add(`steel`,gp(1.2,.9,f+1,f+1.5,.2,.05,0,d),X.supLight),jp(n,0,f+1.5,-4.2,3.5,{r:.09,yard:1.6,col:X.sup});for(let e of[-1,1])for(let t of[3,.8,-1.4,-3.6]){let r=i.sideAt(t,i.deckAt(t).y-.35,e);n.box(`steel`,.4,.4,.8,r.p.x-e*.1,r.p.y,t,X.hullDark),n.rod(`steel`,.05,.045,[r.p.x,r.p.y,t],[r.p.x+e*.9,r.p.y,t+.1],X.gun,6)}for(let e of[-1,1]){let t=i.sideAt(10.8,i.deckAt(10.8).y-.5,e);n.box(`steel`,.5,.5,.12,t.p.x+e*.02,t.p.y,t.p.z,X.black,0,Math.atan2(t.n.x,t.n.z))}return n.box(`steel`,.6,.12,1.4,0,a(10.3)+.06,10.3,X.dark),Lp(n,i,10.6,2,.75,.3,.55),Ip(n,i,-11.7,-10.6,1.4,0),Op(t,`engine`,-.8,.05,i.zSternWL+.4),Op(t,`engine`,.8,.05,i.zSternWL+.4),Op(t,`launch`,0,u+1.2,-1),{hull:i,length:25.900000000000002,beam:r,height:l+3.1}}function Gp(e){let{root:t,P:n}=e,r=3.5,i=yp(n,{L:21.4,B:r,D:1.2,F:1.25,bulwark:.1,rail:.05,sheerF:.9,sheerA:.05,transom:.55,bowP:1.45,sternP:2,uMax:.5,rake:.75,rakeCurve:.4,overhang:.12,flareBow:.4,flareMid:.02,nMid:3.4,nBow:1.3,nStern:3,forefoot:.3,sternRise:.25,hullMat:`steel`,bottomColor:X.red,deckMat:`darksteel`,deckColor:5265504,bands:Up(),railColor:6187122}),a=e=>i.deckAt(e).y+i.spec.camber,o=4.4,s=a(o);n.add(`steel`,gp(2,1.8,s-.05,s+.8,.5,.05,0,o),X.sup),n.add(`steel`,gp(1.5,1.1,s+.8,s+1.45,.4,.12,0,4.550000000000001),X.supLight),n.add(`glass`,gp(1.44,1.04,s+1.1,s+1.3,.38,0,0,4.550000000000001,{cap:!1}),16777215),n.box(`steel`,2.6,.06,.4,0,s+.82,4.9,X.sup),n.rod(`steel`,.08,.05,[0,s+1.4,4],[0,s+5.2,3.2],X.sup,6),n.rod(`steel`,.04,.04,[-.9,s+3.8,3.5000000000000004],[.9,s+3.8,3.5000000000000004],X.dark,5),n.sphere(`lantern`,.08,0,s+5.25,3.2,16777215,6,4),e.flags.push(xp(0,s+4.9,3.1500000000000004,1.2,.65,0,.18));let c=a(0);n.add(`steel`,gp(1.6,5.4,c-.05,c+.5,.3,.03,0,.1),X.sup),Dp(n,t,{z:1.3,y0:c+.5,h:2.7,rx:.42,rz:.72,rake:.25}),Dp(n,t,{z:-1.1,y0:c+.5,h:2.5,rx:.42,rz:.72,rake:.25});for(let[e,t]of[[-3.3,.55],[-5.4,-.55]]){let r=a(e);n.cyl(`steel`,.55,.6,.18,0,r+.09,e,X.dark,14);for(let i=-1;i<=1;i++){let a=Math.cos(t),o=Math.sin(t),s=i*.26,c=[s*a-1.2*o,r+.4,-s*o-1.2*a],l=[s*a+1.3*o,r+.4,-s*o+1.3*a];n.rod(`steel`,.13,.13,[c[0],c[1],c[2]+e],[l[0],l[1],l[2]+e],X.sup,10),n.add(`steel`,new Gi(.1,10),X.black,q(l[0]+o*.01,l[1],l[2]+e+a*.01,0,t))}n.box(`steel`,.6,.35,.5,0,r+.35,e,X.supLight,0,t)}n.add(`steel`,gp(1.4,1.4,a(-7.2)-.05,a(-7.2)+.6,.3,.05,0,-7.1),X.sup);for(let e of[-.9,.9])for(let t=0;t<4;t++)n.cyl(`rubber`,.14,.14,.3,e,a(-10)+.22,-9.3-t*.32,1710618,8,0,0,K/2);Ip(n,i,6.6,9.8,.5,0),Lp(n,i,8.2,2,.8,.28,.6),Ip(n,i,-10.1,-8.3,.35,0),kp(t,0,{style:`gun`,x:0,y:a(6.2)+.05,z:6.2,w:1.2,l:1.5,h:.7,n:1,blen:2.3,br:.1}),kp(t,1,{style:`gun`,x:0,y:a(-8.3)+.05,z:-8.3,ry:K,w:1.2,l:1.5,h:.7,n:1,blen:2.3,br:.1}),Np(n,.95,c+.5,-2.4,0,.8),Np(n,-.95,c+.5,-2.4,0,.8);for(let e of[-.7,.7])Op(t,`engine`,e,.05,i.zSternWL+.3);return Op(t,`launch`,0,a(-4.4)+.5,-4.4),{hull:i,length:22.299999999999997,beam:r,height:s+5.2}}function Kp(e){let{root:t,P:n}=e,r=5.3,i=yp(n,{L:29.4,B:r,D:2.1,F:1.9,bulwark:.12,rail:.06,sheerF:.9,sheerA:.15,transom:.4,bowP:1.35,sternP:2.1,uMax:.5,rake:.35,rakeCurve:.25,overhang:.25,flareBow:.42,flareMid:0,nMid:4.5,nBow:1.35,nStern:2.6,forefoot:.18,hullMat:`steel`,bottomColor:X.red,deckMat:`teak`,bands:Up(),railColor:X.hull}),a=e=>i.deckAt(e).y+i.spec.camber;[{z:9.4,lift:0,ry:0},{z:5.9,lift:1.2,ry:0},{z:-9.3,lift:0,ry:K}].forEach((e,r)=>{let i=a(e.z)+e.lift;n.cyl(`steel`,1.4,1.45,e.lift+.35,0,a(e.z)+(e.lift+.35)/2-.2,e.z,X.sup,28),kp(t,r,{style:`battle`,x:0,y:i+.15,z:e.z,ry:e.ry,w:2.7,l:3.2,h:1.05,n:3,blen:5,br:.13,sp:.72})});let o=a(0);n.add(`steel`,gp(3.6,8.2,o-.05,o+1,.8,.05,0,-.3),X.sup),n.add(`steel`,gp(2.9,6,o+1,o+1.9,.6,.05,0,-.1),X.sup);let s=2.6;n.add(`steel`,J(hp(8,1.1,0,s,K/8,1,1.05),o+1.9,hp(8,1,0,s,K/8,1,1),o+3.2),X.sup),n.add(`steel`,gp(3,1.6,o+3.2,o+3.6,.5,0,0,2.8000000000000003),X.supLight),n.add(`glass`,gp(2.2,1.3,o+3.6,o+3.85,.4,0,0,2.8000000000000003,{cap:!1}),16777215),n.add(`steel`,gp(2.2,1.3,o+3.85,o+4.05,.4,0,0,2.8000000000000003),X.supLight),n.add(`steel`,J(hp(8,.8,0,2.5,K/8),o+4.05,hp(8,.7,0,2.5,K/8),o+5.4),X.sup),n.add(`steel`,gp(1.9,1,o+5.4,o+5.75,.3,0,0,s),X.supLight),n.add(`glass`,gp(1.5,.8,o+5.75,o+5.95,.25,0,0,s,{cap:!1}),16777215),n.add(`steel`,gp(1.5,.8,o+5.95,o+6.15,.25,0,0,s),X.supLight),n.add(`steel`,gp(1,1.1,o+6.15,o+6.8,.2,.08,0,s),X.sup),n.box(`steel`,2.2,.18,.22,0,o+6.55,2.4,X.dark),n.rod(`steel`,.1,.07,[0,o+6.8,2.3000000000000003],[0,o+8.4,2.2],X.sup,6),n.rod(`steel`,.05,.05,[-1.2,o+7.8,2.2],[1.2,o+7.8,2.2],X.dark,5),Ap(t,{x:0,y:o+8.4,z:2.2,style:`bed`,size:1,speed:1.8}),Dp(n,t,{z:-1.2,y0:o+1.9,h:3.3,rx:.8,rz:1.25,rake:.08});let c=-3.4;n.add(`steel`,J(hp(8,.65,0,c,K/8),o+1.9,hp(8,.55,0,c,K/8),o+3.6),X.sup),n.add(`steel`,gp(1,.9,o+3.6,o+4.1,.2,.08,0,c),X.supLight),n.box(`steel`,1.8,.16,.2,0,o+3.9,-3.6,X.dark),n.rod(`steel`,.08,.05,[0,o+4.1,c],[0,o+6.6,-3.6999999999999997],X.sup,6),n.rod(`steel`,.04,.04,[-1,o+5.6,-3.6],[1,o+5.6,-3.6],X.dark,5),n.sphere(`lantern`,.08,0,o+6.65,-3.6999999999999997,16777215,6,4),e.flags.push(xp(0,o+6.4,-3.75,1.4,.8,0,.16));for(let e of[-1,1])for(let t of[2.2,-.2,-2.6])Pp(n,e*1.55,o+1,t,e>0?K/2-.2:-K/2+.2,1.1);for(let e of[-1,1]){for(let t of[3.4,.9,-1.8,-4])Np(n,e*1.25,o+1.9,t*.9,e>0?.3:-.3,.8);for(let t of[-5.6,-6.6])Np(n,e*(i.deckAt(t).half-.6),a(t),t,e>0?1.2:-1.2,.8);Np(n,e*(i.deckAt(11.8).half-.45),a(11.8),11.8,e>0?.6:-.6,.7)}let l=-12.3,u=a(l);n.cyl(`steel`,.3,.3,.3,1.2,u+.15,l,X.dark,10),n.box(`steel`,.3,.12,3.2,1.2,u+.36,-12.100000000000001,X.dark,0,.4),Fp(n,1.1+Math.sin(.4)*.3,u+.6,-12,.4,.9,X.navy),n.box(`steel`,.3,1.2,.3,-1.3,u+.6,-11.9,X.sup),n.rod(`steel`,.05,.05,[-1.3,u+1.2,-11.9],[-.2,u+2.2,-12.700000000000001],X.dark,5);for(let e of[-1,1]){let t=i.sideAt(12.4,i.deckAt(12.4).y-.6,e);n.box(`steel`,.55,.55,.12,t.p.x+e*.02,t.p.y,t.p.z,X.black,0,Math.atan2(t.n.x,t.n.z))}n.box(`steel`,.8,.1,1.6,0,a(11.6)+.05,11.6,X.dark),Lp(n,i,12.3,2,.75,.3,.55),Ip(n,i,-13.9,-12.9,1.6,0);for(let e of[-1.2,-.4,.4,1.2])Op(t,`engine`,e,.05,i.zSternWL+.5);return Op(t,`launch`,1.2,u+.6,-10.5),{hull:i,length:30.299999999999997,beam:r,height:o+9.2}}function qp(e){let{root:t,P:n}=e,r=yp(n,{L:32,B:4.9,D:2,F:2.3,bulwark:0,sheerF:.35,sheerA:.1,transom:.62,bowP:1.5,sternP:2.2,uMax:.5,rake:.45,rakeCurve:.3,overhang:.55,flareBow:.45,flareMid:.05,nMid:4.2,nBow:1.3,nStern:3,forefoot:.18,hullMat:`steel`,bottomColor:X.red,deckMat:`steel`,deckColor:X.deckSteel,bands:Up(!0,!1),camber:0}),i=[];for(let e=0;e<=12;e++){let t=ep(-14.2,13.2,e/12);i.push([Math.min(r.deckAt(t).half,2.55)-.05,t])}for(let e=12;e>=0;e--){let t=ep(-14.2,13.2,e/12);i.push([-(Math.min(r.deckAt(t).half,2.55)-.05),t])}n.add(`steel`,J(i,2,null,3.6,{cap:!1}),X.hull);for(let e of[-1,1])for(let t=0;t<6;t++){let r=-10+t*3.8;e<0&&r>-4&&r<5||n.box(`rubber`,.08,.9,2.4,e*2.52,5.6/2+.05,r,921618)}let a=3.8,o=-16.4,s=16.4,c=e=>{let t=(e-o)/32.8,n=t>.8?1-((t-.8)/.2)**2*.55:1,r=t<.04?.92+t/.04*.08:1;return 3.7*n*r},l=[];for(let e=0;e<=24;e++){let t=ep(o,s,e/24);l.push([c(t),t])}for(let e=24;e>=0;e--){let t=ep(o,s,e/24);l.push([-c(t),t])}let u=J(l,3.55,null,a,{cap:!0,base:!0});{let e=u.attributes.position,t=u.attributes.uv,n=u.attributes.normal;for(let r=0;r<e.count;r++)n.getY(r)>.9?t.setXY(r,(3.7-e.getX(r))/7.4,(e.getZ(r)-o)/32.8):t.setXY(r,.02,.5)}n.add(`flightDeck`,u,16777215);for(let e=-14;e<=14;e+=2.8)for(let t of[-1,1]){let i=Math.min(r.deckAt(e).half,2.55);n.rod(`steel`,.06,.06,[t*(i-.1),3,e],[t*(c(e)-.3),3.55,e],X.hullDark,4)}for(let e of[-1,1]){n.box(`steel`,.4,.08,20,e*(3.7+.2),3.5,-2,X.dark);for(let t of[-12,-8,7.5,11])Np(n,e*4.05,3.5,t,e>0?1.4:-1.4,.75)}let d=-3.05;n.add(`steel`,gp(1.25,6.4,3.78,5.1,.35,.05,d,1),X.sup),n.add(`steel`,gp(1.1,4.4,5.1,6.1,.3,.05,d,1.8),X.sup),n.add(`steel`,gp(1.3,2.2,6.1,6.5,.3,0,d,2.8),X.supLight),n.add(`glass`,gp(1.1,2,6.5,6.75,.28,0,d,2.8,{cap:!1}),16777215),n.add(`steel`,gp(1.1,2,6.75,6.949999999999999,.28,0,d,2.8),X.supLight),n.add(`steel`,gp(.8,1,6.949999999999999,7.5,.18,.06,d,3),X.sup),Dp(n,t,{x:d,z:.19999999999999996,y0:6.1,h:2,rx:.5,rz:1.1,rake:.18});let f=1.9,p=6.949999999999999;n.rod(`steel`,.08,.06,[d,p,f],[d,10.549999999999999,f],X.sup,6),n.rod(`steel`,.06,.05,[-2.5999999999999996,p,1.2999999999999998],[d,9.95,f],X.sup,5),n.rod(`steel`,.06,.05,[-3.5,p,1.2999999999999998],[d,9.95,f],X.sup,5),n.rod(`steel`,.04,.04,[-4.15,9.35,f],[-1.9499999999999997,9.35,f],X.dark,5),Ap(t,{x:d,y:10.549999999999999,z:f,style:`bed`,size:1.1,speed:1.6}),Ap(t,{x:d,y:7.499999999999999,z:3.6,style:`dish`,size:.6,speed:-.9}),e.flags.push(xp(d,10.25,1.7999999999999998,1.3,.75,0,.16)),[[-1.9,-13],[-.6,-13.2],[.7,-13],[2,-13.2],[-1.3,-11],[0,-11.2],[1.3,-11],[2.2,-8.8],[1,-8.8]].forEach(([e,t],r)=>Fp(n,e,3.98,t,0,1,X.navy,r%3==1)),Fp(n,-1.2,3.98,11.5,0,1,X.navy);let m=(e,t,r,i,a=0)=>n.box(`team`,e,.04,t,r,3.82,i,16777215,0,a);m(.35,6,3.35,-2),m(.35,6,2.95,-10.5),m(.35,4.5,-3.35,-12),m(.35,4,-3.35,8.8),m(.5,2.4,-.55,13.8,.6),m(.5,2.4,.55,13.8,-.6),m(.5,2.4,-.55,12.4,.6),m(.5,2.4,.55,12.4,-.6);for(let e=-15;e<=15;e+=2.5)for(let t of[-1,1])n.box(`lantern`,.08,.05,.08,t*(c(e)-.1),3.82,e,16777215);kp(t,0,{style:`twin5`,x:-3,y:a,z:5.4,w:1,l:1.3,h:.6,n:2,blen:1.7,br:.07,sp:.35}),kp(t,1,{style:`twin5`,x:-3,y:a,z:-2.9,ry:K,w:1,l:1.3,h:.6,n:2,blen:1.7,br:.07,sp:.35});for(let e of[-1.4,-.5,.5,1.4])Op(t,`engine`,e,.05,r.zSternWL+.8);return Op(t,`launch`,.4,4.2,15.4),{hull:r,length:33.8,beam:7.4,height:11.149999999999999}}function Jp(e){let{root:t,P:n}=e,r=5.4,i=yp(n,{L:27.8,B:r,D:1.9,F:1.9,bulwark:0,sheerF:.05,sheerA:0,transom:.7,bowP:1.25,sternP:2.6,uMax:.45,rake:-.85,overhang:-.25,flareBow:-.1,flareMid:-.22,nMid:5,nBow:1.2,nStern:4,forefoot:0,sternRise:.1,nu:20,nLow:3,rowStep:1,camber:0,hullMat:`stealth`,bottomColor:X.graphiteDark,deckMat:`stealthDark`,deckColor:X.graphiteDark,bands:[{to:.12,mat:`teamGlow`,color:16777215},{to:-.32,color:X.graphite},{to:-.22,mat:`teamGlow`,color:16777215},{to:-1e-4,color:X.graphite}],transomColor:X.graphite}),a=e=>i.deckAt(e).y,o=a(-2);n.add(`stealth`,J([[-2.1,-8.2],[2.1,-8.2],[2.3,-6.8],[2.3,-.2],[1.2,2.3],[-1.2,2.3],[-2.3,-.2],[-2.3,-6.8]],o-.05,[[-1.4,-7.4],[1.4,-7.4],[1.55,-6.4],[1.55,-1],[.8,.6],[-.8,.6],[-1.55,-1],[-1.55,-6.4]],o+2.6),X.graphite);let s=[[-1.2,-5.6],[1.2,-5.6],[1.3,-1.4],[.6,.1],[-.6,.1],[-1.3,-1.4]];n.add(`stealth`,J(s,o+2.6,[[-.8,-5],[.8,-5],[.85,-1.8],[.4,-.8],[-.4,-.8],[-.85,-1.8]],o+4),X.graphite),n.add(`glass`,J(Y(s,1.01,1.01,0,-2.5),o+2.62,Y(s,.9,.93,0,-2.5),o+3,{cap:!1}),16777215);for(let e of[-1,1])n.box(`stealthDark`,.06,1.2,1.6,e*1.93,o+1.4,-3.2,X.graphiteDark,0,0,e*.29),n.box(`teamGlow`,.05,.05,6.8,e*2.29,o+.08,-3.4,16777215),n.box(`teamGlow`,.05,.05,5.6,e*1.52,o+2.58,-3.6,16777215);n.box(`teamGlow`,2.4,.05,.05,0,o+.08,2.32,16777215),n.add(`stealth`,J(hp(6,.5,0,-3.2,0),o+4,hp(6,.18,0,-3.2,0),o+6),X.graphite),Ap(t,{x:0,y:o+6,z:-3.2,style:`ring`,size:1,speed:2.4,mat:`stealth`,col:X.graphite});let c=(e,t,r)=>{let i=.52,o=t*.62,s=r*.62,c=a(e);n.box(`stealthDark`,o+.3,.08,s+.3,0,c+.04,e,X.graphiteDark);for(let a=0;a<t;a++)for(let o=0;o<r;o++){let s=(a-(t-1)/2)*.62,l=e+(o-(r-1)/2)*.62;n.box(`stealth`,i,.1,i,s,c+.12,l,(a+o)%3?X.graphite:4870232)}for(let r=0;r<=t;r++)n.box(`teamGlow`,.03,.03,s,(r-t/2)*.62,c+.1,e,16777215)};c(5.6,5,6),c(-10.2,4,3),kp(t,0,{style:`rail`,x:0,y:a(9.6)+.05,z:9.6,w:2.3,l:3,h:.95,blen:5.6}),kp(t,1,{style:`laser`,x:0,y:o+2.6,z:-6.6,ry:K,w:1.1,l:1.2,h:.7,blen:1,br:.08});let l=a(12);n.box(`teamGlow`,1.6,.04,.14,-.55,l+.03,12.2,16777215,0,.7),n.box(`teamGlow`,1.6,.04,.14,.55,l+.03,12.2,16777215,0,-.7);for(let e of[-1.3,1.3])Op(t,`engine`,e,.05,i.zSternWL+.3);return Op(t,`launch`,0,a(5.6)+.3,5.6),{hull:i,length:i.zBowWL-i.zSternWL,beam:r,height:o+6.4}}function Yp(e){let{root:t,P:n}=e,r=yp(n,{L:34,B:5.2,D:2,F:2.1,bulwark:0,sheerF:.2,sheerA:0,transom:.7,bowP:1.3,sternP:2.4,uMax:.45,rake:-.6,overhang:-.15,flareBow:0,flareMid:-.18,nMid:5,nBow:1.2,nStern:4,forefoot:0,nu:20,nLow:3,rowStep:1,camber:0,hullMat:`stealth`,bottomColor:X.graphiteDark,deckMat:`stealthDark`,deckColor:X.graphiteDark,bands:[{to:.14,mat:`teamGlow`,color:16777215},{to:-1e-4,color:X.graphite}],transomColor:X.graphite});for(let e of[-1,1]){let r=new op,i=yp(r,{L:19,B:1.5,D:1.1,F:1.6,bulwark:0,sheerF:.1,sheerA:0,transom:.6,bowP:1.3,sternP:2.4,uMax:.45,rake:-.6,overhang:-.1,flareBow:0,flareMid:-.15,nMid:4,nBow:1.2,nStern:3,forefoot:0,nu:14,nLow:2,rowStep:1,camber:0,hullMat:`stealth`,bottomColor:X.graphiteDark,deckMat:`stealthDark`,deckColor:X.graphiteDark,bands:[{to:.12,mat:`teamGlow`,color:16777215},{to:-1e-4,color:X.graphite}],transomColor:X.graphite}),a=q(e*5.3,0,-4);for(let[e,t]of r.map)for(let r of t)r.applyMatrix4(a),n.addRaw(e,r);Op(t,`engine`,e*5.3,.05,-4+i.zSternWL+.2)}let i=[[-6.1,-12.8],[6.1,-12.8],[6.1,3.5],[3.8,7.5],[-3.8,7.5],[-6.1,3.5]],a=Y(i,.98,.98,0,-2.6);n.add(`stealth`,J(Y(i,.92,.95,0,-2.6),1.15,i,1.8499999999999999,{cap:!1,base:!0}),X.graphite),n.add(`stealthDark`,J(i,1.8499999999999999,a,2.1999999999999997,{cap:!0}),X.graphiteDark),n.add(`teamGlow`,J(i,1.7899999999999998,null,1.8699999999999999,{cap:!1}),16777215);let o=-3.5,s=hp(6,1,0,o,K/6,3.6,7.2),c=hp(6,1,0,o,K/6,2.6,5.8);n.add(`stealth`,J(s,2.1999999999999997,c,5.1),X.graphite);let l=hp(6,1,0,-3.8,K/6,1.7,3.6);n.add(`stealth`,J(Y(c,.92,.95,0,o),5.1,l,6.299999999999999),4870232);for(let e of[-1,1])for(let t=0;t<3;t++){let r=-6.7+t*3.2,i=e*3.2,a=e*.34;n.box(`stealthDark`,.1,1.9,2.4,i+e*.02,3.3999999999999995,r,X.graphiteDark,0,0,a),n.box(`teamPulse`,.06,1.5,2,i+e*.08,3.3999999999999995,r,16777215,0,0,a)}n.box(`teamPulse`,2.6,1.4,.06,0,3.1999999999999997,3.4000000000000004,16777215,-.33,0,0),n.box(`teamPulse`,2.6,1.4,.06,0,3.1999999999999997,-10.4,16777215,.33,0,0);let u=6.299999999999999;n.add(`teamGlow`,new Ia(.9,1.05,24),16777215,q(0,6.3199999999999985,-3.8,-K/2)),n.add(`teamGlow`,new Ia(.3,.38,16),16777215,q(0,6.3199999999999985,-3.8,-K/2));let d=-3.8,f=new kn;f.position.set(0,u,d),f.userData.rig=`spin`,f.userData.speed=.6;let p=new op;p.add(`teamPulse`,new Ra(2.2,.08,6,36),16777215,q(0,1.2,0,K/2)),p.add(`teamPulse`,new Ra(1.6,.07,6,30),16777215,q(0,2.1,0,K/2+.25));for(let e=0;e<6;e++){let t=e*K/3;p.add(`stealth`,new Wi(.14,.14,.5),X.graphite,q(Math.cos(t)*2.2,1.2,Math.sin(t)*2.2,0,-t))}p.build(f),t.add(f);let m=2.1999999999999997;for(let[e,t,r]of[[-1.8,-10.5,4.2],[-.6,-11.3,5.2],[.6,-11.3,5],[1.8,-10.5,4],[0,-9.4,3.4],[-3.4,-11.8,2.6],[3.4,-11.8,2.6]])n.rod(`stealth`,.09,.04,[e,m,t],[e,m+r,t],X.graphite,5),n.sphere(`teamGlow`,.11,e,m+r+.08,t,16777215,6,4),n.rod(`stealth`,.03,.03,[e-.4,m+r*.7,t],[e+.4,m+r*.7,t],X.graphiteDark,4);n.add(`stealth`,J(hp(6,.8,0,-10.6,0),m,hp(6,.6,0,-10.6,0),2.6999999999999997),X.graphiteDark);let h=new La(.9,12,6,0,K*2,0,K*.3);n.add(`stealth`,h,X.graphite,q(2.6,3.5,-8.8,.5,.6,0)),n.rod(`stealth`,.08,.08,[2.6,m,-8.8],[2.6,3.3,-8.8],X.graphite,5);for(let e of[-1,1])for(let t=0;t<2;t++)for(let r=0;r<5;r++){let i=e*(4.3+t*1),a=-10+r*2.2;n.box(`stealthDark`,.8,.06,.8,i,2.23,a,3159355),n.add(`teamGlow`,new Ia(.3,.36,12),16777215,q(i,2.27,a,-K/2)),n.box(`stealth`,.5,.1,.12,i,2.3499999999999996,a,5922920,0,K/4),n.box(`stealth`,.5,.1,.12,i,2.3499999999999996,a,5922920,0,-K/4),n.box(`stealth`,.18,.14,.18,i,2.3699999999999997,a,8028296)}let g=r.deckAt(11).y;n.add(`teamGlow`,J([[-.1,7.6],[.1,7.6],[.1,15.5],[-.1,15.5]],g+0,null,g+.04,{sides:!1}),16777215),kp(t,0,{style:`laser`,x:0,y:r.deckAt(11.5).y+.05,z:11.5,w:1.6,l:1.6,h:.9,blen:1.4,br:.1}),kp(t,1,{style:`laser`,x:0,y:u,z:-8.1,ry:K,w:1.2,l:1.2,h:.7,blen:1,br:.08});for(let e of[-1.2,1.2])Op(t,`engine`,e,.05,r.zSternWL+.2);return Op(t,`launch`,0,6.699999999999999,d),{hull:r,length:r.zBowWL-Math.min(r.zSternWL,-13.5),beam:12.4,height:9.299999999999999}}function Xp(e,t){return Vp(e,{L:t?9.4:6.9,masts:t?2:1,creep:!0})}function Zp(e,t){let{root:n,P:r}=e,i=t?10.6:7.8,a=i/4.6,o=yp(r,{L:i,B:a,D:i*.08,F:i*.07,bulwark:.12,rail:.06,sheerF:i*.02,sheerA:i*.03,transom:.4,bowP:1.6,sternP:2.2,uMax:.45,rake:.05,overhang:.45,flareBow:.1,nMid:3,nBow:1.5,forefoot:.1,nu:30,nLow:5,hullMat:`steel`,bottomColor:X.red,deckMat:`steel`,deckColor:10518616,bands:[{to:.1,color:X.boot},{to:-.25,color:2434858},{to:-1e-4,mat:`team`,color:16777215}],railColor:2434858}),s=e=>o.deckAt(e).y+o.spec.camber,c=i/7.8;r.add(`steel`,gp(1.1*c,2*c,s(-.3)-.05,s(-.3)+.5*c,.2,.03,0,-.3*c),X.white),r.add(`steel`,gp(.8*c,.7*c,s(.6)+.5*c,s(.6)+.95*c,.12,.03,0,.4*c),X.white),r.box(`steel`,.82*c,.12*c,.72*c,0,s(.6)+.8*c,.4*c,1713456);let l=s(-.3)+.5*c,u=t?[-.5,-1.4]:[-.8];for(let e of u)Dp(r,n,{z:e*c,y0:l,h:1.6*c,rx:.2*c,rz:.2*c,rake:.1,body:X.buff,cap:X.black});for(let e of u)r.box(`furnace`,.26*c,.05,.2*c,.4*c,l+.02,e*c,16777215);r.rod(`steel`,.04*c,.03*c,[0,l,.9*c],[0,l+2.3*c,.9*c],2763823,5),r.rod(`steel`,.025*c,.025*c,[-.4*c,l+1.7*c,.9*c],[.4*c,l+1.7*c,.9*c],2763823,4),r.add(`team`,Qp(0,l+2.2*c,.85*c,.8*c,.45*c),16777215),r.box(`steel`,.9*c,.04,1*c,0,s(-2.6*c)+.7*c,-2.6*c,X.white);for(let e of[-.4,.4])for(let t of[-2.2,-3])r.rod(`steel`,.02,.02,[e*c,s(t*c),t*c],[e*c,s(t*c)+.7*c,t*c],2763823,3);return kp(n,0,{style:`cannon`,x:0,y:s(2.4*c),z:2.4*c,w:.8*c,l:.9*c,n:1,blen:1.2*c,br:.09*c}),Op(n,`engine`,0,.05,o.zSternWL),Op(n,`launch`,0,l,0),{hull:o,length:i+.3,beam:a,height:l+2.3*c}}function Qp(e,t,n,r,i){let a=xp(e,t,n,r,i,.2,.12,1.2),o=a.attributes.position.array,s=a.morphAttributes.position[0].array;for(let e=0;e<o.length;e++)o[e]+=s[e]*.8;a.morphAttributes={},a.computeVertexNormals();let c=a.toNonIndexed(),l=$p(c);return vd([ip(c),ip(l)])}function $p(e){let t=e.clone(),n=t.attributes.normal.array;for(let e=0;e<n.length;e++)n[e]=-n[e];for(let e of Object.keys(t.attributes)){let n=t.attributes[e],r=n.itemSize,i=n.array;for(let e=0;e<n.count;e+=3)for(let t=0;t<r;t++){let n=(e+1)*r+t,a=(e+2)*r+t,o=i[n];i[n]=i[a],i[a]=o}}return t}function em(e,t){let{root:n,P:r}=e,i=t?11:8,a=i/5.4,o=i/8,s=yp(r,{L:i,B:a,D:.6*o,F:.62*o,bulwark:.06,rail:.04,sheerF:.45*o,sheerA:.02,transom:.55,bowP:1.45,sternP:2,uMax:.5,rake:.6,rakeCurve:.3,overhang:.1,flareBow:.35,nMid:3.4,nBow:1.3,forefoot:.3,nu:30,nLow:5,rowStep:.5,hullMat:`steel`,bottomColor:X.red,deckMat:`steel`,deckColor:X.deckSteel,bands:[{to:.12,color:X.boot},{to:-.2,color:X.hull},{to:-1e-4,mat:`team`,color:16777215}],railColor:X.hull}),c=e=>s.deckAt(e).y+s.spec.camber,l=1.6*o;r.add(`steel`,gp(.95*o,1.1*o,c(l)-.05,c(l)+.45*o,.25*o,.03,0,l),X.sup),r.add(`steel`,gp(.75*o,.6*o,c(l)+.45*o,c(l)+.8*o,.2*o,.05,0,l+.1*o),X.supLight),r.add(`glass`,gp(.72*o,.56*o,c(l)+.6*o,c(l)+.72*o,.19*o,0,0,l+.1*o,{cap:!1}),16777215),r.rod(`steel`,.04*o,.03*o,[0,c(l)+.8*o,l-.2*o],[0,c(l)+2.6*o,l-.5*o],X.sup,5),r.rod(`steel`,.02*o,.02*o,[-.4*o,c(l)+2*o,l-.4*o],[.4*o,c(l)+2*o,l-.4*o],X.dark,4);let u=c(0)+.05;r.add(`steel`,gp(.8*o,2.6*o,u-.1,u+.25*o,.15*o,.02,0,-.4*o),X.sup);let d=t?[.3,-.9]:[-.2];for(let e of d)Dp(r,n,{z:e*o,y0:u+.25*o,h:1.2*o,rx:.2*o,rz:.34*o,rake:.18});let f=-1.9*o,p=c(f);for(let e=-1;e<=1;e++)r.rod(`steel`,.07*o,.07*o,[e*.15*o-.4*o,p+.18*o,f-.6*o],[e*.15*o+.4*o,p+.18*o,f+.6*o],X.sup,6);return r.cyl(`steel`,.3*o,.32*o,.1*o,0,p+.05*o,f,X.dark,10),t?kp(n,0,{style:`gun`,x:0,y:c(2.6*o),z:2.6*o,w:.8*o,l:1*o,h:.45*o,n:2,blen:1.3*o,br:.05*o,sp:.2*o,teamRoof:!1}):kp(n,0,{style:`gun`,x:0,y:c(2.6*o),z:2.6*o,w:.7*o,l:.9*o,h:.42*o,n:1,blen:1.2*o,br:.06*o,teamRoof:!1}),Ip(r,s,-3.3*o,-2.6*o,.7*o,0),Lp(r,s,3.3*o,1,.5,.2*o,.6),Op(n,`engine`,0,.05,s.zSternWL),Op(n,`launch`,0,u+.4,-1.2*o),{hull:s,length:i+.4*o,beam:a,height:c(l)+2.6*o}}function tm(e,t){let{root:n,P:r}=e,i=t?11:8,a=i/5,o=i/8,s=yp(r,{L:i,B:a,D:.5*o,F:.6*o,bulwark:.05,rail:.04,sheerF:.25*o,sheerA:0,transom:.72,bowP:1.35,sternP:2.4,uMax:.45,rake:.8,rakeCurve:.2,overhang:0,flareBow:.35,flareMid:.05,nMid:3,nBow:1.2,forefoot:.35,sternRise:.4,nu:28,nLow:5,rowStep:.5,hullMat:`steel`,bottomColor:X.red,deckMat:`steel`,deckColor:5922920,bands:[{to:.08,color:X.boot},{to:-.18,color:7107966},{to:-1e-4,mat:`team`,color:16777215}],railColor:7107966}),c=e=>s.deckAt(e).y+s.spec.camber,l=c(.6*o),u=[[-.7*o,-1.2*o],[.7*o,-1.2*o],[.75*o,.5*o],[.4*o,1.4*o],[-.4*o,1.4*o],[-.75*o,.5*o]],d=Y(u,.8,.82,0,0);r.add(`steel`,J(u,l-.05,d,l+.55*o),9410720),r.add(`steel`,J(Y(d,.98,.98),l+.28*o,Y(d,.93,.93),l+.42*o,{cap:!1}),1054751),r.add(`steel`,J(Y(d,.7,.6,0,-.3*o),l+.55*o,Y(d,.4,.4,0,-.3*o),l+1.3*o),9410720);for(let e of[-1,1])for(let n=0;n<(t?2:1);n++){let t=-1.9*o-n*.7*o;r.add(`steel`,new Of(.34*o,.34*o,1.5*o,1,.04),10857908,q(e*.34*o,c(t)+.35*o,t,-.25,e*.15,0)),r.add(`steel`,new Gi(.12*o,8),X.black,q(e*.34*o+e*.11*o,c(t)+.53*o,t+.73*o,-.25,e*.15))}Ip(r,s,2*o,3.4*o,.28*o,0),Ap(n,{x:0,y:l+1.3*o,z:.2*o,style:`bar`,size:.6*o,speed:3}),kp(n,0,{style:`gun`,x:0,y:c(2.4*o),z:2.4*o,w:.6*o,l:.75*o,h:.38*o,n:1,blen:.9*o,br:.05*o,teamRoof:!1});for(let e of[-.4,.4])Op(n,`engine`,e*o,.05,s.zSternWL);return Op(n,`launch`,0,c(-2*o)+.6*o,-2*o),{hull:s,length:i+.5*o,beam:a,height:l+1.8*o}}function nm(e,t){let{root:n,P:r}=e,i=t?11:8,a=i/4.8,o=i/8,s=yp(r,{L:i,B:a,D:.45*o,F:.55*o,bulwark:0,sheerF:.05,sheerA:0,transom:.75,bowP:1.2,sternP:3,uMax:.42,rake:-.35,overhang:-.1,flareBow:0,flareMid:-.25,nMid:5,nBow:1.2,nStern:4,forefoot:0,nu:14,nLow:2,rowStep:1,camber:0,hullMat:`stealth`,bottomColor:X.graphiteDark,deckMat:`stealth`,deckColor:3159354,bands:[{to:.07,mat:`teamGlow`,color:16777215},{to:-.12,color:X.graphite},{to:-.06,mat:`teamGlow`,color:16777215},{to:-1e-4,color:X.graphite}],transomColor:X.graphite}),c=e=>s.deckAt(e).y,l=-.3*o,u=c(l),d=[[-.65*o,-1.4*o],[.65*o,-1.4*o],[.7*o,.4*o],[0,1.4*o],[-.7*o,.4*o]],f=[[-.35*o,-1.1*o],[.35*o,-1.1*o],[.38*o,.1*o],[0,.6*o],[-.38*o,.1*o]];r.add(`stealth`,J(d,u-.05,f,u+.55*o),4870232),r.add(`teamGlow`,J(Y(f,.6,.6,0,-.3*o),u+.55*o,null,u+.58*o,{sides:!1}),16777215),r.add(`teamGlow`,new Wi(.9*o,.05*o,.05*o),16777215,q(0,u+.3*o,.72*o,0,0,0)),r.add(`stealth`,J(hp(5,.12*o,0,-.8*o),u+.55*o,hp(5,.05*o,0,-.8*o),u+1.4*o),X.graphite),r.sphere(`teamGlow`,.07*o,0,u+1.45*o,-.8*o,16777215,6,4);let p=c(2.4*o);r.box(`teamGlow`,.8*o,.03,.08*o,-.25*o,p+.02,2.4*o,16777215,0,.7),r.box(`teamGlow`,.8*o,.03,.08*o,.25*o,p+.02,2.4*o,16777215,0,-.7);for(let e of[-.45,.45])r.box(`stealth`,.3*o,.3*o,.5*o,e*o,.12*o,s.zSternWL+.1,X.graphiteDark);kp(n,0,{style:`laser`,x:0,y:c(1.8*o),z:1.8*o,w:.62*o,l:.7*o,h:.38*o,blen:.6*o,br:.045*o});for(let e of[-.45,.45])Op(n,`engine`,e*o,.05,s.zSternWL-.1);return Op(n,`launch`,0,u+.8*o,l),{hull:s,length:s.zBowWL-s.zSternWL,beam:a,height:u+1.5*o}}var rm={frigate:e=>Vp(e),ironclad:Hp,dreadnought:Wp,torpedo:Gp,battleship:Kp,carrier:qp,arsenal:Jp,mothership:Yp},im={1:Xp,2:Zp,3:em,4:tm,5:nm},am=new Map;function om(e,t){if(am.has(e))return am.get(e);let n=zp(),r=t(n);if(e.startsWith(`creep`)&&n.flags.length){for(let e of n.flags){let t=e.attributes.position.array,r=e.morphAttributes.position[0].array;for(let e=0;e<t.length;e++)t[e]+=r[e]*.8;e.morphAttributes={},e.computeVertexNormals();let i=e.toNonIndexed();n.P.addRaw(`team`,ip(i)),n.P.addRaw(`team`,ip($p(i)))}n.flags=[]}let i=Bp(n,r),a=new er().setFromObject(i),o={root:i,length:r.length,beam:r.beam,height:Math.max(r.height||0,a.max.y),draws:0};return i.traverse(e=>{e.isMesh&&o.draws++}),am.set(e,o),o}function sm(e,t){let n=e.root.clone(!0),r={root:n,length:e.length,beam:e.beam,height:e.height,turrets:[],broadside:[],stacks:[],engines:[],launch:null,drawCalls:e.draws},i=[],a=[],o=[],s=new Map,c=[];n.traverse(e=>{e.isMesh&&(e.material=wp(e.userData.mat,t),e.userData.rig===`sails`&&a.push(e),e.userData.rig===`flag`&&o.push(e));let n=e.userData.rig;n===`turret`?s.set(e.userData.idx,{pivot:e,muzzles:[]}):n===`muzzle`?c.push(e):n===`broadside`?r.broadside.push(e):n===`stack`?r.stacks.push(e):n===`engine`?r.engines.push(e):n===`launch`?r.launch=e:n===`spin`&&i.push(e)});for(let e of c)s.get(e.userData.turret)?.muzzles.push(e);r.turrets=[...s.keys()].sort((e,t)=>e-t).map(e=>s.get(e)),r.launch||=Op(n,`launch`,0,1,0);let l=Math.random()*10;return r.update=(e,t,n=0)=>{Qf(t);let r=$f(n,0,1);for(let e of a)e.morphTargetInfluences[0]=.25+.75*r+.07*Math.sin(t*1.9+l);let s=t*(4+3*r)+l,c=.5+.5*r;for(let e of o)e.morphTargetInfluences[0]=Math.cos(s)*c,e.morphTargetInfluences[1]=-Math.sin(s)*c;for(let t of i)t.rotation.y+=e*t.userData.speed},r.update(0,0,0),r}function cm(e,t=0){let n=rm[e];if(!n)throw Error(`Unknown hull `+e);return sm(om(`hero:`+e,n),t)}function lm(e=1,t=!1,n=0){let r=$f(Math.round(e)||1,1,5),i=im[r];return sm(om(`creep:`+r+`:`+ +!!t,e=>i(e,t)),n)}Object.keys(rm);var Z=Math.PI,um=(e,t,n)=>e<t?t:e>n?n:e,dm=(e,t,n)=>e+(t-e)*n;function fm(e,t,n){let r=um((n-e)/(t-e),0,1);return r*r*(3-2*r)}function pm(e,t,n){let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,982451653);return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}function mm(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=a*a*(3-2*a),c=o*o*(3-2*o),l=pm(r,i,n),u=pm(r+1,i,n),d=pm(r,i+1,n),f=pm(r+1,i+1,n);return dm(dm(l,u,s),dm(d,f,s),c)*2-1}function hm(e,t,n,r=4){let i=0,a=.5,o=1;for(let s=0;s<r;s++)i+=a*mm(e*o,t*o,n+s*17),o*=2.03,a*=.5;return i}var gm={wetSand:new V(9403740),sand:new V(14074513),rock:new V(7828074),rockDark:new V(5196614),grass:new V(5995063),moss:new V(7309893)};function _m(e,{R:t,top:n=1.4,flatR:r=t*.5,seed:i=1,rough:a=1}){let o=[],s=[],c=[],l=r/t;for(let e=0;e<=24;e++){let r=e/24*t*1.12;for(let e=0;e<84;e++){let c=e/84*Z*2,u=Math.cos(c),d=Math.sin(c),f=r/(t*(1+.13*hm(u*1.4+i,d*1.4-i,i,3))),p=u*r,m=d*r,h;if(f<=l)h=n+.12*hm(p*.25,m*.25,i+5,2);else if(f<=1){let e=(f-l)/(1-l);h=dm(n,-2.6,fm(0,1,e)**1.25)+hm(p*.32,m*.32,i+9,4)*1.1*a*Math.sin(Z*um(e*1.1,0,1))+.25*fm(.3,.6,e)*hm(p*.9,m*.9,i+3,2)}else h=-2.6-(f-1)*12;let g=f>l?.35:0;p+=g*mm(p*.7,m*.7,i+11),m+=g*mm(m*.7,p*.7,i+13),o.push(p,h,m),s.push(p*.2,m*.2)}}for(let e=0;e<24;e++)for(let t=0;t<84;t++){let n=e*84+t,r=e*84+(t+1)%84,i=n+84,a=r+84;c.push(n,i,r,r,i,a)}let u=new Mr;if(u.setAttribute(`position`,new H(o,3)),u.setAttribute(`uv`,new H(s,2)),u.setIndex(c),u.computeVertexNormals(),u.attributes.normal.getY(168)<0){for(let e=0;e<c.length;e+=3){let t=c[e+1];c[e+1]=c[e+2],c[e+2]=t}u.setIndex(c),u.computeVertexNormals()}let d=u.attributes.normal,f=u.attributes.position,p=new Float32Array(f.count*3),m=new V;for(let e=0;e<f.count;e++){let t=f.getX(e),n=f.getY(e),r=f.getZ(e),a=d.getY(e),o=hm(t*.5,r*.5,i+21,2)*.5+.5;n<.1?m.copy(gm.wetSand).lerp(gm.rockDark,fm(-.5,-2.5,n)*.5):n<.55&&a>.6?m.copy(gm.sand).lerp(gm.wetSand,fm(.4,.1,n)):a<.78?m.copy(gm.rock).lerp(gm.rockDark,um(.78-a,0,.5)*1.6*o):m.copy(gm.grass).lerp(gm.moss,o).lerp(gm.rock,fm(.9,.78,a)*.7);let s=.88+.24*mm(t*1.7,r*1.7,i+31);p[e*3]=m.r*s,p[e*3+1]=m.g*s,p[e*3+2]=m.b*s}u.setAttribute(`color`,new H(p,3)),e.addRaw(`rock`,u.toNonIndexed());let h=0,g=Math.round(t*.9);for(let n=0;n<g;n++){let r=pm(n,7,i)*Z*2,a=t*dm(.72,1.02,pm(n,9,i)),o=dm(.6,1.8,pm(n,11,i))*(t/15),s=new Ma(1,1),c=s.attributes.position;for(let e=0;e<c.count;e++){let t=1+.28*mm(c.getX(e)*2+n,c.getY(e)*2+c.getZ(e)*1.3,i+41);c.setXYZ(e,c.getX(e)*t,c.getY(e)*t*.7,c.getZ(e)*t)}s.computeVertexNormals();let l=pm(n,13,i)>.5?7236194:5920336;e.add(`rock`,s,l,q(Math.cos(r)*a,-.1+pm(n,15,i)*.4,Math.sin(r)*a,pm(n,17,i)*3,pm(n,19,i)*3,0,o,o,o)),h++}}var vm=16777215,ym=11051672,bm=9209468,xm=4081232,Sm=10111538;function Cm(e,t,n,{h:r=.7,w:i=.6,gap:a=.55,t:o=.45,inset:s=.25,mat:c=`stone`,col:l=ym}={}){let u=t.length;for(let d=0;d<u;d++){let f=t[d],p=t[(d+1)%u],m=p[0]-f[0],h=p[1]-f[1],g=Math.hypot(m,h),_=Math.atan2(m,h),v=h/g,y=-m/g,b=(f[0]+p[0])/2,x=(f[1]+p[1])/2,S=b*v+x*y>0?-1:1,C=Math.max(1,Math.floor(g/(i+a)));for(let t=0;t<C;t++){let a=(t+.5)/C,u=f[0]+m*a+v*S*s,d=f[1]+h*a+y*S*s;e.box(c,o,r,i,u,n+r/2,d,l,0,_)}}}function wm(e,t,n,r,i,a,o,s=0,c=xm,l=`paint`){let u=[[-t/2,-n/2],[t/2,-n/2],[t/2,n/2],[-t/2,n/2]],d=[[-.01,-n/2+.02],[.01,-n/2+.02],[.01,n/2-.02],[-.01,n/2-.02]];e.add(l,J(u,0,d,r,{cap:!1,uvScale:.5}),c,q(i,a,o,0,s,0))}function Tm(e,t,n,r,i,a,o=10,s=`team`,c=16777215){e.add(s,new qi(t,n,o,1),c,q(r,i+n/2,a))}function Em(e,t,n,r,i,a,{roofH:o=0,roofMat:s=`team`,crenel:c=!0,seg:l=10}={}){e.add(`stone`,J(hp(l,r*1.06,t,n),i,hp(l,r,t,n),a,{uvScale:.14}),vm),e.add(`stone`,J(hp(l,r,t,n),a,hp(l,r*1.12,t,n),a+.45,{uvScale:.14}),ym),o?Tm(e,r*1.18,o,t,a+.45,n,l,s):c&&Cm(e,hp(l,r*1.12,t,n),a+.45,{w:.45,gap:.45,h:.6,inset:.2});for(let o=0;o<3;o++){let s=o/3*Z*2+.4;e.box(`rubber`,.18,.8,.1,t+Math.cos(s)*r*1.01,dm(i,a,.55),n+Math.sin(s)*r*1.01,1118481,0,-s+Z/2)}}function Dm(e,t,n,r,i=2.2){e.rod(`iron`,.07,.05,[t,n,r],[t,n+i,r],2763824,6),e.add(`lantern`,new Pa(.22,0),16777215,q(t,n+i+.2,r,0,0,0,1,1.4,1)),e.cyl(`iron`,.02,.2,.15,t,n+i+.5,r,2763824,6)}function Om(e,{z:t=0,s:n=1}){let r=[],i=(t,n,i)=>{let a=new An;a.userData.eraMin=t,a.userData.eraMax=n,i(a),e.add(a),r.push(a)};return i(1,2,e=>{let r=new op;r.cyl(`wood`,1.3*n,1.35*n,.2*n,0,.1*n,t,8018496,16),r.box(`wood`,.5*n,.5*n,.5*n,.9*n,.45*n,t-.6*n,6965812),r.cyl(`wood`,.2*n,.2*n,.45*n,-.95*n,.42*n,t-.5*n,6965812,8),r.build(e),kp(e,0,{style:`cannon`,x:-.45*n,y:.18*n,z:t,w:.9*n,l:1*n,n:1,blen:1.9*n,br:.15*n}),kp(e,0,{style:`cannon`,x:.45*n,y:.18*n,z:t,w:.9*n,l:1*n,n:1,blen:1.9*n,br:.15*n})}),i(3,3,e=>{let r=new op;r.cyl(`steel`,1.2*n,1.3*n,.35*n,0,.17*n,t,6976380,20),r.build(e),kp(e,0,{style:`battle`,x:0,y:.35*n,z:t,w:1.9*n,l:2.2*n,h:.85*n,n:2,blen:3.2*n,br:.12*n,sp:.6*n})}),i(4,5,e=>{let r=new op;r.cyl(`steel`,1.2*n,1.3*n,.3*n,0,.15*n,t,6976380,20),r.rod(`steel`,.08*n,.06*n,[0,.3*n,t-.9*n],[0,2.2*n,t-.9*n],4870232,6),r.build(e),kp(e,0,{style:`missile`,x:0,y:.3*n,z:t+.25*n,w:1.3*n,l:1.3*n,h:1.1*n,n:3}),Ap(e,{x:0,y:2.2*n,z:t-.9*n,style:`bar`,size:1.1*n,speed:2.5})}),r}var km=new Map;function Am(e,t){if(km.has(e))return km.get(e);let n=new An,r={root:n,P:new op,flags:[]},i=t(r);r.P.build(n),Sp(n,r.flags,`flag`,`flag`);let a={root:n,info:i};return km.set(e,a),a}function jm(e,t){let n=e.root.clone(!0),r=null,i=null,a=null,o=[],s=[],c=[],l=[];return n.traverse(e=>{e.isMesh&&(e.material=wp(e.userData.mat,t),e.userData.rig===`flag`&&c.push(e));let n=e.userData.rig;n===`spin`?o.push(e):n===`bob`?s.push(e):n===`top`?i=e:n===`beacon`?a=e:n===`spivot`&&(r=e),e.userData.eraMin&&l.push(e)}),{root:n,pivot:r,top:i,beacon:a,spin:o,bob:s,flags:c,variants:l}}function Mm(e,t,n,r){Qf(n);for(let n of e.spin)n.rotation.y+=t*n.userData.speed;for(let t of e.bob)t.position.y=t.userData.baseY+Math.sin(n*1.3+r)*t.userData.amp;let i=n*4+r;for(let t of e.flags)t.morphTargetInfluences[0]=Math.cos(i)*.8,t.morphTargetInfluences[1]=-Math.sin(i)*.8}function Nm(e){let{root:t,P:n}=e;_m(n,{R:13,top:1.3,flatR:6.2,seed:3});let r=hp(8,5.6,0,0,Z/8);n.add(`stone`,J(r,.6,Y(r,.92),3.4,{uvScale:.14}),vm),n.add(`stone`,J(Y(r,.92),3.4,null,3.45,{sides:!1}),bm),Cm(n,Y(r,.92),3.45,{w:.7,gap:.6}),n.add(`stone`,J(Y(r,1.02),.4,Y(r,.98),1,{uvScale:.14}),ym);for(let e=0;e<5;e++)n.box(`stone`,2.2,.35,.8,0,.9+e*.5,7-e*.5,ym);n.box(`rubber`,1.3,1.5,.1,0,2.3,5.2,1381653,.12,0,0);let i=[[2.5,2.2,3.4,8.2,`stone`,vm],[2.2,2.15,8.2,9.4,`team`,16777215],[2.15,1.9,9.4,13.2,`stone`,vm],[1.9,1.86,13.2,14.4,`team`,16777215],[1.86,1.75,14.4,15.5,`stone`,vm]];for(let[e,t,r,a,o,s]of i)n.add(o,J(hp(8,e,0,0,Z/8),r,hp(8,t,0,0,Z/8),a,{cap:!1,uvScale:.14}),s);for(let e of[5.5,11.2])for(let t of[.4,2.2,4])n.box(`rubber`,.25,.8,.1,Math.cos(t)*2.28-(e>10?Math.cos(t)*.2:0),e,Math.sin(t)*2.28-(e>10?Math.sin(t)*.2:0),1118481,0,-t+Z/2);n.add(`stone`,J(hp(8,1.75,0,0,Z/8),15.5,hp(8,2.9,0,0,Z/8),16.2,{uvScale:.14}),ym);let a=hp(16,2.85);for(let e=0;e<a.length;e++){let t=a[e],r=a[(e+1)%a.length];n.rod(`iron`,.05,.05,[t[0],16.85,t[1]],[r[0],16.85,r[1]],2763824,4),n.rod(`iron`,.04,.04,[t[0],16.2,t[1]],[t[0],16.85,t[1]],2763824,4)}n.add(`iron`,J(hp(8,1.1,0,0,Z/8),16.2,null,16.6),3159098),n.add(`lantern`,J(hp(8,.98,0,0,Z/8),16.6,null,18.1,{cap:!1}),16777215);for(let e of hp(8,1,0,0,Z/8))n.rod(`iron`,.05,.05,[e[0],16.6,e[1]],[e[0],18.1,e[1]],2763824,4);n.add(`iron`,J(hp(8,1.25,0,0,Z/8),18.1,hp(8,.15,0,0,Z/8),19.5),4086350),n.sphere(`brass`,.22,0,19.7,0,16777215,10,6),n.rod(`iron`,.03,.03,[0,19.8,0],[0,20.8,0],2763824,4);let o=new An;o.position.set(0,17.35,0),o.userData.rig=`spin`,o.userData.speed=1.1;let s=new op;s.add(`lamp`,new Pa(.42,1),16777215);for(let e of[-1,1]){let t=new Ki(.25,1.5,9,16,1,!0);t.translate(0,4.9,0),s.add(`lightBeam`,t,16777215,q(0,0,0,e*Z/2,0,0))}s.build(o,{cast:!1,receive:!1}),t.add(o);let c=new kn;c.position.set(0,16.2,0),c.userData.rig=`spivot`,t.add(c),Om(c,{z:1.95,s:.85});for(let e of[Z/8+Z/2,Z/8+Z])Dm(n,Math.cos(e)*4.4,3.45,Math.sin(e)*4.4,1.4);return n.rod(`iron`,.06,.05,[3.6,3.45,-3.6],[3.6,9.5,-3.6],2763824,6),e.flags.push(xp(3.6,9.4,-3.65,2.4,1.5,0,.14)),Op(t,`beacon`,0,17.35,0),Op(t,`top`,0,22.5,0),{height:22}}function Pm(e){let{root:t,P:n}=e;_m(n,{R:15,top:1.3,flatR:8.8,seed:7});let r=[];for(let e=0;e<12;e++){let t=e/12*Z*2+Z/12;r.push([Math.cos(t)*(e%2?6.6:8.9),Math.sin(t)*(e%2?6.6:8.9)])}n.add(`stone`,J(r,.5,Y(r,.94),5.4,{uvScale:.14}),vm),n.add(`stone`,J(Y(r,.94),5.4,null,5.45,{sides:!1}),bm),n.add(`stone`,J(Y(r,1.03),.3,Y(r,1),1.2,{uvScale:.14}),ym),Cm(n,Y(r,.94),5.45,{w:.7,gap:.6}),n.box(`rubber`,2,2.4,.2,0,2.2,6.25,1315860,.08),n.box(`team`,2.1,.5,.25,0,3.7,6.3,16777215,.08);for(let e=0;e<4;e++)n.box(`stone`,3,.35,.8,0,.7+e*.35,8.6-e*.7,ym);let i=mp(6.6,6.6,.3);n.add(`stone`,J(i,5.4,Y(i,.93),15,{uvScale:.14}),vm),n.add(`stone`,J(Y(i,.93),15,Y(i,1),15.5,{uvScale:.14}),ym);for(let[e,t,r]of[[0,3.3,0],[0,-3.3,Z],[3.3,0,Z/2],[-3.3,0,-Z/2]]){let i=new Wi(1.5,4.2,.06);n.add(`team`,i,16777215,q(e*1,11.2,t*1,-.035,r,0)),n.add(`brass`,new Ki(.05,.05,1.8,6),16777215,q(e*1.02,13.35,t*1.02,0,r,Z/2))}for(let[e,t]of[[1.6,3.2],[-1.6,3.2],[3.2,-1.6],[-3.2,1.6]])n.box(`rubber`,.3,1,.1,e,8,t,1118481,0,Math.abs(e)>3?Z/2:0);for(let[e,t]of[[3.3,3.3],[-3.3,3.3],[3.3,-3.3],[-3.3,-3.3]])Em(n,e,t,1.25,5.4,16.8,{roofH:2.8});for(let e=0;e<12;e+=2)Em(n,r[e][0]*.93,r[e][1]*.93,.9,5.4,7,{crenel:!0,seg:8});let a=mp(4.4,4.4,.25);n.add(`stone`,J(a,15.5,Y(a,.96),20.5,{uvScale:.14}),vm),n.add(`stone`,J(Y(a,.96),20.5,Y(a,1.06),21,{uvScale:.14}),ym),Cm(n,Y(a,1.06),21,{w:.55,gap:.5,h:.6});for(let[e,t]of[[0,2.15],[0,-2.15],[2.15,0],[-2.15,0]])n.box(`rubber`,.3,1.1,.1,e,18.2,t,1118481,0,Math.abs(e)>1?Z/2:0);for(let[e,t,r]of[[-5.4,.3,Z/6],[5.2,.8,-Z/6],[.4,-5.4,Z/2]])n.add(`stone`,gp(1.8,2.8,5.4,6.6,.05,0,0,0,{uvScale:.14}),ym,q(e,0,t,0,r)),wm(n,2.1,3,1,e,6.6,t,r,Sm);n.rod(`iron`,.06,.05,[-3.3,19.6,-3.3],[-3.3,24.2,-3.3],2763824,6),e.flags.push(xp(-3.3,24.1,-3.35,2.6,1.6,0,.14));let o=new kn;o.position.set(0,21,0),o.userData.rig=`spivot`,t.add(o),Om(o,{z:0,s:1});for(let e=1;e<12;e+=3)Dm(n,r[e][0]*.9,5.45,r[e][1]*.9,1.2);return new kn,Op(t,`beacon`,-3.3,24.2,-3.3),Op(t,`top`,0,26.5,0),{height:26}}function Fm(e){let{root:t,P:n}=e;_m(n,{R:30,top:1.5,flatR:23.5,seed:11,rough:1.3});let r=[];for(let e=0;e<8;e++){let t=e/8*Z*2+Z/8;r.push([Math.cos(t)*21,Math.sin(t)*21])}for(let e=0;e<8;e++){let t=r[e],i=r[(e+1)%8],a=i[0]-t[0],o=i[1]-t[1],s=Math.hypot(a,o),c=Math.atan2(a,o),l=(t[0]+i[0])/2,u=(t[1]+i[1])/2,d=[[-1.4,-s/2],[1.4,-s/2],[1.4,s/2],[-1.4,s/2]],f=[[-1.1,-s/2],[1.1,-s/2],[1.1,s/2],[-1.1,s/2]];n.add(`stone`,J(d,.5,f,8,{uvScale:.12}),vm,q(l,0,u,0,c)),n.add(`stone`,J(f,8,null,8.05,{sides:!1}),bm,q(l,0,u,0,c));let p=l/Math.hypot(l,u),m=u/Math.hypot(l,u),h=Math.floor(s/1.3);for(let e=0;e<h;e++){let t=(e+.5)/h-.5,r=l+a*t+p*.85,i=u+o*t+m*.85;n.box(`stone`,.5,.8,.7,r,8.45,i,ym,0,c)}}for(let e=0;e<8;e++){let[t,i]=r[e];Em(n,t,i,3,.4,e===1||e===2?12.5:10.5,{roofH:4.2,seg:12}),Dm(n,t*.86,8.05,i*.86,1.3)}n.add(`stone`,gp(7,4,.5,11,.4,.2,0,21*Math.cos(Z/8)+.4,{uvScale:.12}),vm),n.box(`rubber`,3.2,4.5,.2,0,2.8,21*Math.cos(Z/8)+2.45,1184274),n.box(`team`,4.4,1.1,.25,0,5.8,21*Math.cos(Z/8)+2.45,16777215),Cm(n,mp(7.2,4.2,.4,0,21*Math.cos(Z/8)+.4),11,{w:.6,gap:.6}),n.add(`stone`,J(mp(8,13,.6,0,59/2),-1.5,null,1.3,{uvScale:.12}),ym);for(let e=25;e<36;e+=3.5)for(let t of[-3.6,3.6])n.cyl(`iron`,.2,.25,.5,t,1.55,e,2763824,8);for(let e of[-3.4,3.4])Dm(n,e,1.3,35,2.6);n.add(`stone`,J(hp(24,19.5),1.2,hp(24,19.2),1.8,{uvScale:.12}),bm),[[-11,6,.3],[-13,-4,1.2],[11,7,-.4],[13,-3,2],[-6,-13,.8],[6,-13,-.7],[-8,12,.2],[8,12,-.3]].forEach(([e,t,r],i)=>{n.add(`stone`,gp(3.2,4.4,1.8,3.9,.05,0,0,0,{uvScale:.14}),i%2?vm:ym,q(e,0,t,0,r)),wm(n,3.6,4.6,1.8,e,3.9,t,r,i%3?xm:Sm)});let i=mp(16,16,1.2);n.add(`stone`,J(i,1.8,Y(i,.94),14,{uvScale:.12}),vm),n.add(`stone`,J(Y(i,.94),14,Y(i,.98),14.6,{uvScale:.12}),ym),Cm(n,Y(i,.98),14.6,{w:.8,gap:.8,h:.8});for(let[e,t]of[[7.4,7.4],[-7.4,7.4],[7.4,-7.4],[-7.4,-7.4]])Em(n,e,t,1.8,13,19.5,{roofH:3.2});let a=mp(11,11,.9);n.add(`stone`,J(a,14.5,Y(a,.95),24,{uvScale:.12}),vm),n.add(`stone`,J(Y(a,.95),24,Y(a,1),24.5,{uvScale:.12}),ym),Cm(n,Y(a,1),24.5,{w:.7,gap:.7,h:.7});let o=mp(7,7,.7);n.add(`stone`,J(o,24.4,Y(o,.94),32,{uvScale:.12}),vm),n.add(`stone`,J(Y(o,.94),32,Y(o,1.05),32.6,{uvScale:.12}),ym);for(let[e,t,r,i]of[[8,9.5,6,2.6],[5.5,20,5,2]])for(let a of[0,Z/2,Z,-Z/2])n.add(`team`,new Wi(i,r,.08),16777215,q(Math.sin(a)*e*.985,t,Math.cos(a)*e*.985,-.03,a,0));for(let e of[0,Z/2,Z,-Z/2])for(let t of[-2.2,2.2]){let r=Math.cos(e),i=Math.sin(e);n.box(`lantern`,.5,1.3,.1,i*3.35+r*t*.7,28,r*3.35-i*t*.7,16777215,0,e)}n.add(`stone`,J(hp(8,2.8,0,0,Z/8),32.6,hp(8,1.8,0,0,Z/8),35,{uvScale:.14}),ym),n.add(`teamMetal`,J(hp(8,1.9,0,0,Z/8),35,hp(8,2.2,0,0,Z/8),35.6),16777215);for(let e=0;e<4;e++){let t=e*Z/2+Z/4;n.rod(`brass`,.18,.08,[Math.cos(t)*2,35.4,Math.sin(t)*2],[Math.cos(t)*1.2,39.5,Math.sin(t)*1.2],16777215,6)}let s=new An;s.position.set(0,40.5,0),s.userData.rig=`bob`,s.userData.baseY=40.5,s.userData.amp=.5;let c=new An;c.userData.rig=`spin`,c.userData.speed=.5,s.add(c);let l=new op,u=new Pa(1,0);l.add(`teamGlow`,u,16777215,q(0,0,0,0,0,0,2.3,4.6,2.3));for(let e=0;e<4;e++){let t=e*Z/2;l.add(`teamGlow`,new Pa(1,0),16777215,q(Math.cos(t)*3.2,-1.5,Math.sin(t)*3.2,0,t,.3,.5,1.3,.5))}l.build(c,{cast:!1});let d=new An;d.userData.rig=`spin`,d.userData.speed=-.9,s.add(d);let f=new op;f.add(`teamPulse`,new Ra(4.2,.14,6,48),16777215,q(0,0,0,Z/2+.2,0,0)),f.add(`teamPulse`,new Ra(3.4,.1,6,40),16777215,q(0,.6,0,Z/2-.3,.8,0)),f.build(d,{cast:!1}),t.add(s);let p=new op;p.add(`teamBeam`,new Ki(1,1.6,36,16,1,!0),16777215,q(0,58.5,0)),p.build(t,{cast:!1,receive:!1});for(let t of[1,2]){let[i,a]=r[t];n.rod(`iron`,.08,.06,[i,16.5,a],[i,21.5,a],2763824,6),e.flags.push(xp(i,21.4,a-.05,3.2,2,0,.14))}let m=new kn;return m.position.set(0,24.5,0),m.userData.rig=`spivot`,t.add(m),Om(m,{z:4.3/1.5,s:1.5}),Op(t,`beacon`,0,40.5,0),Op(t,`top`,0,48,0),{height:46}}var Im={outer:Nm,inner:Pm,citadel:Fm};function Lm(e=`outer`,t=0){let n=Im[e]||Nm,r=jm(Am(`struct:`+e,n),t),i=[],a={pivot:r.pivot,muzzles:i},o=0,s=Math.random()*10,c={root:r.root,turret:a,top:r.top,beacon:r.beacon,era:1,setEra(e){if(e=um(Math.round(e)||1,1,5),e!==o){o=e,c.era=e,i.length=0;for(let t of r.variants){let n=e>=t.userData.eraMin&&e<=t.userData.eraMax;t.visible=n,n&&t.traverse(e=>{e.userData.rig===`muzzle`&&i.push(e)})}}},update(e,t){Mm(r,e,t,s)}};return c.setEra(1),c.update(0,0),c}function Rm(e){let{root:t,P:n}=e;_m(n,{R:18,top:1.2,flatR:10.5,seed:17,rough:.8}),n.add(`stone`,J(mp(9,3,.4,2.5,10.5),-1.5,null,1.35,{uvScale:.14}),ym);let r=(e,t,r,i)=>{let a=t-e,o=i-r;n.add(`teak`,J(mp(a,o,.05,(e+t)/2,(r+i)/2),1.05,null,1.3,{uvScale:.35}),11571312);for(let a=r+.6;a<i;a+=2)for(let r of[e+.25,t-.25])n.cyl(`wood`,.2,.22,3.4,r,-.6,a,5914672,8);for(let a of[e+.1,t-.1])n.box(`wood`,.16,.2,o,a,1.38,(r+i)/2,5914672)};r(1,4.2,11.5,25),r(-5,1,21.8,24.6);for(let e of[14,18,22])n.cyl(`iron`,.15,.18,.4,4,1.5,e,2763824,8);Dm(n,4,1.3,24.6,2.4),Dm(n,-4.6,1.3,24.2,2.4),Dm(n,1.2,1.3,11.8,2.4);let i=(e,t,r,i,a,o,s)=>{n.add(`stone`,gp(i,a,1,1+o*.45,.05,0,0,0,{uvScale:.16}),ym,q(e,0,t,0,r)),n.add(`wood`,gp(i*.98,a*.98,1+o*.45,1+o,.05,0,0,0,{cap:!1,uvScale:.25}),10123352,q(e,0,t,0,r)),wm(n,i+.4,a+.4,o*.45,e,1+o,t,r,s),n.add(`rubber`,new Wi(i*.4,o*.55,.1),1709072,q(e,0,t,0,r).multiply(q(0,1+o*.3,a/2+.02)))};i(-5.2,-2.5,.1,5.2,7.5,3.4,Sm),i(-5.8,6.2,-.15,4.2,5,3,xm),i(3.8,-6.2,.35,4.6,5.6,3.2,Sm);let a=2.6,o=13.8,s=1.3,c=13080618;for(let[e,t]of[[-.9,-.9],[.9,-.9],[-.9,.9],[.9,.9]])n.rod(`paint`,.12,.1,[a+e*1.2,s,o+t*1.2],[a+e*.5,5.8,o+t*.5],c,6);for(let e of[1.5,3]){let t=1.08*(1-e/4.5*.58);n.rod(`paint`,.06,.06,[a-t,s+e,o-t],[a+t,s+e,o+t],c,4),n.rod(`paint`,.06,.06,[a+t,s+e,o-t],[a-t,s+e,o+t],c,4)}n.add(`paint`,gp(1.6,1.8,5.8,7.1,.15,.05,a,o),c),n.add(`glass`,gp(1.62,.5,6.3,6.8,.1,0,a,14.5,{cap:!1}),16777215),n.box(`paint`,1.2,.8,1,a,6.5,12.5,5921370);let l=[2.6,10.8,21.3];n.rod(`paint`,.16,.1,[2.25,6.8999999999999995,14.4],l,c,6),n.rod(`paint`,.16,.1,[2.95,6.8999999999999995,14.4],l,c,6),n.rod(`paint`,.06,.06,[a,8.3,o],l,c,4),n.rod(`paint`,.1,.1,[a,7.1,o],[a,8.4,o],c,6),n.rod(`rubber`,.025,.025,l,[l[0],3.7,l[2]],1381653,3),n.box(`iron`,.35,.35,.35,l[0],3.5,l[2],2763824),n.box(`wood`,1.3,.9,1.3,l[0],2.8,l[2],9071176);let u=(e,t)=>Math.sin(e*12.9898+t*78.233)*43758.5453%1;for(let e=0;e<14;e++){let t=-1.5+Math.abs(u(e,1))*5,r=3+Math.abs(u(e,2))*6.5,i=.7+Math.abs(u(e,3))*.5;e%3?n.box(`wood`,i,i,i,t,1.25+i/2,r,e%2?10122832:8018490,0,u(e,4)*3):n.cyl(`wood`,.35,.35,.9,t,1.7,r,6965808,10)}return Em(n,7.5,3.5,1.3,1,5.2,{roofH:1.8,roofMat:`paint`,seg:8}),n.cyl(`stone`,.8,1,.6,0,1.5,1.5,ym,10),n.rod(`iron`,.1,.07,[0,1.6,1.5],[0,11.5,1.5],14211288,8),n.sphere(`brass`,.18,0,11.6,1.5,16777215,8,6),e.flags.push(xp(0,11.4,1.45,3.6,2.2,0,.13)),Op(t,`top`,0,13,1.5),{height:12}}function zm(){let e=jm(Am(`port`,Rm),-1),t=Math.random()*10,n=null,r={root:e.root,top:e.top,owner:-1,setOwner(t){let i=t!=null&&t>=0?t:-1;if(i!==n){n=i,r.owner=i;for(let t of e.flags)t.material=i>=0?wp(`flag`,i):wp(`flagNeutral`,-1)}},update(n,r){Mm(e,n,r,t)}};return r.setOwner(-1),r.update(0,0),r}var Bm=1,Vm={y:0,nx:0,ny:1,nz:0};new B;var Hm=new fn(0,0,0,`YXZ`),Um=e=>Math.atan2(Math.sin(e),Math.cos(e)),Wm=class{constructor(e,t,n){this.G=e,this.id=Bm++,this.kind=t,this.team=n,this.x=0,this.z=0,this.yaw=0,this.vx=0,this.vz=0,this.speed=0,this.hp=1,this.maxHp=1,this.armor=0,this.radius=5,this.alive=!0,this.stun=0,this.slow=0,this.slowT=0,this.shield=0,this.shieldT=0,this.untargetable=0,this.silence=0,this.damagers=new Map,this.lastAttacker=null,this.gunCd=0,this.target=null,this.rig=null,this.hitFlash=0}get isShip(){return this.kind===`hero`||this.kind===`creep`}get targetable(){return this.alive&&this.untargetable<=0}dist2(e){let t=e.x-this.x,n=e.z-this.z;return t*t+n*n}dist(e){return Math.sqrt(this.dist2(e))}heal(e){this.alive&&(this.hp=Math.min(this.maxHp,this.hp+e))}removeVisual(){this.rig&&this.G.scene.remove(this.rig.root)}};function Gm(e,t,n,r,i,a,o=16){let s=e.G,c=0;if(n!==null&&e.stun<=0){let o=n-e.x,s=r-e.z,l=Math.hypot(o,s);if(l>1.5){let n=Um(Math.atan2(o,s)-e.yaw),r=Math.sign(n)*Math.min(Math.abs(n),a*t);e.yaw=Um(e.yaw+r),e.turnRate=r/Math.max(t,1e-4),c=i*Math.max(.25,Math.cos(Math.min(Math.abs(n),Math.PI/2)))*Math.min(1,l/18+.25)}else e.turnRate=0}else e.turnRate=0;let l=c>e.speed?o:o*1.4;e.speed+=Math.sign(c-e.speed)*Math.min(Math.abs(c-e.speed),l*t);let u=Math.sin(e.yaw),d=Math.cos(e.yaw),f=e.x+(u*e.speed+(e.pushX||0))*t,p=e.z+(d*e.speed+(e.pushZ||0))*t;e.pushX=(e.pushX||0)*Math.max(0,1-t*4),e.pushZ=(e.pushZ||0)*Math.max(0,1-t*4);for(let t of s.obstacles){let n=f-t.x,r=p-t.z,i=t.r+e.radius*.8,a=n*n+r*r;if(a<i*i){let e=Math.sqrt(a)||1;f=t.x+n/e*i,p=t.z+r/e*i}}f=Math.max(-Yd.x+8,Math.min(Yd.x-8,f)),p=Math.max(-Yd.z+8,Math.min(Yd.z-8,p)),e.vx=(f-e.x)/Math.max(t,1e-4),e.vz=(p-e.z)/Math.max(t,1e-4),e.x=f,e.z=p}function Km(e,t){for(let t=0;t<e.length;t++){let n=e[t];if(n.alive)for(let r=t+1;r<e.length;r++){let t=e[r];if(!t.alive)continue;let i=t.x-n.x,a=t.z-n.z,o=(n.radius+t.radius)*.85,s=i*i+a*a;if(s<o*o&&s>1e-6){let e=Math.sqrt(s),r=(o-e)*.5,c=i/e,l=a/e,u=t.kind===`hero`&&n.kind!==`hero`?.8:n.kind===`hero`&&t.kind!==`hero`?.2:.5;n.x-=c*r*u,n.z-=l*r*u,t.x+=c*r*(1-u),t.z+=l*r*(1-u)}}}}function qm(e,t,n,r=1){let i=e.rig;if(!i)return;od(e.x,e.z,n,Vm);let a=i.length*.4,o=Math.sin(e.yaw),s=Math.cos(e.yaw),c=od(e.x+o*a,e.z+s*a,n,{y:0}).y,l=od(e.x-o*a,e.z-s*a,n,{y:0}).y,u=i.beam*.5,d=od(e.x+s*u,e.z-o*u,n,{y:0}).y,f=od(e.x-s*u,e.z+o*u,n,{y:0}).y,p=Math.atan2(l-c,a*2)*r,m=Math.atan2(d-f,u*2)*r,h=At.clamp(-(e.turnRate||0)*.12*Math.min(1,e.speed/20),-.14,.14);e.leanS=At.lerp(e.leanS||0,h,Math.min(1,t*3));let g=(c+l+d+f)*.25*r,_=0,v=0;if(!e.alive&&e.sinkT!==void 0){let t=Math.min(1,e.sinkT/5);g-=t*t*(i.height+8),_=t*(e.sinkDir||1)*.5,v=t*.35}i.root.position.set(e.x,g,e.z),Hm.set(p+_,e.yaw,m+e.leanS+v),i.root.quaternion.setFromEuler(Hm)}var Jm=class extends Wm{constructor(e,t,n,r,i){super(e,`hero`,t),this.name=n,this.isPlayer=r,this.slot=i,this.hullId=`frigate`,this.age=1,this.level=1,this.xp=0,this.gold=mf.startGold,this.upg={plating:0,gunnery:0,engines:0,reload:0,repair:0},this.cds=[0,0,0,0],this.buffs=[],this.kills=0,this.deaths=0,this.assists=0,this.streak=0,this.dmgDealt=0,this.creepKills=0,this.respawn=0,this.moveX=null,this.moveZ=null,this.path=[],this.attackOrder=null,this.wakeT=0,this.stackT=0,this.lane=`mid`,this.setHull(`frigate`,!0)}get hull(){return _f[this.hullId]}get abilities(){return this.hull.abilities.map(e=>({id:e,...vf[e]}))}get lvlMul(){return 1+.07*(this.level-1)}get dmgMul(){return this.lvlMul*(1+.1*this.upg.gunnery)}get cdMul(){return 1-.07*this.upg.reload}get maxSpeed(){let e=1+.06*this.upg.engines;for(let t of this.buffs)t.speedMul&&(e*=t.speedMul);return this.slowT>0&&(e*=1-this.slow),this.hull.speed*e}computeMaxHp(){return Math.round(this.hull.hp*this.lvlMul*(1+.1*this.upg.plating))}setHull(e,t=!1){let n=t?1:this.hp/this.maxHp;this.hullId=e,this.age=_f[e].age,this.maxHp=this.computeMaxHp(),this.hp=Math.max(1,Math.round(this.maxHp*Math.max(n,t?1:.5))),this.armor=this.hull.armor,this.radius=this.hull.radius,this.cds=[0,0,0,0];let r=this.rig;this.rig=cm(e,this.team),this.rig.root.traverse(e=>{e.isMesh&&(e.userData.unitId=this.id)}),this.G.scene.add(this.rig.root),r&&this.G.scene.remove(r.root),this.shieldMesh=null}refreshStats(){let e=this.hp/this.maxHp;this.maxHp=this.computeMaxHp(),this.hp=Math.round(this.maxHp*e)}addXp(e){if(this.level>=mf.maxLevel)return;this.xp+=e;let t=!1;for(;this.level<mf.maxLevel&&this.xp>=this.xpToNext();)this.xp-=this.xpToNext(),this.level++,t=!0;if(t){let e=this.hp/this.maxHp;this.maxHp=this.computeMaxHp(),this.hp=Math.min(this.maxHp,Math.round(this.maxHp*e+this.maxHp*.1)),this.G.events.emit(`levelUp`,this)}}xpToNext(){return 90+60*this.level}canAgeUp(){return this.age<5}nextAgeCost(){return this.age<5?hf[this.age].cost:1/0}upgradeCost(e){let t=yf.find(t=>t.id===e),n=this.upg[e];return n>=t.max?1/0:t.cost[n]}commandMove(e,t){this.attackOrder=null,this.setDestination(e,t)}setDestination(e,t){this.moveX=e,this.moveZ=t,this.path=this.G.nav.findPath(this.x,this.z,e,t)}commandAttack(e){this.attackOrder=e,this.path=[],this.repathT=0}stop(){this.moveX=null,this.path=[],this.attackOrder=null}update(e){let t=this.G;if(!this.alive)return;for(let t=0;t<4;t++)this.cds[t]=Math.max(0,this.cds[t]-e);this.stun=Math.max(0,this.stun-e),this.silence=Math.max(0,this.silence-e),this.slowT=Math.max(0,this.slowT-e),this.untargetable=Math.max(0,this.untargetable-e),this.hitFlash=Math.max(0,this.hitFlash-e),this.shieldT>0&&(this.shieldT-=e,this.shieldT<=0&&(this.shield=0));for(let t=this.buffs.length-1;t>=0;t--){let n=this.buffs[t];n.t+=e,n.healPerSec&&this.heal(n.healPerSec*e),n.t>=n.dur&&this.buffs.splice(t,1)}this.heal(this.maxHp*(.0015+.004*this.upg.repair)*e);let n=t.fountains[this.team];(this.x-n.x)**2+(this.z-n.z)**2<n.r*n.r&&this.heal(this.maxHp*mf.fountainHeal*e);let r=null,i=null,a=this.hull.guns.range;if(this.attackOrder){let n=this.attackOrder;!n.alive||n.team===this.team?this.attackOrder=null:this.dist(n)>a*.9?(this.repathT=(this.repathT||0)-e,(this.repathT<=0||!this.path.length)&&(this.path=t.nav.findPath(this.x,this.z,n.x,n.z),this.repathT=.6)):this.path=[]}if(this.path.length){let e=this.path[0];r=e.x,i=e.z;let t=this.path.length===1?6:14;(e.x-this.x)**2+(e.z-this.z)**2<t*t&&(this.path.shift(),this.path.length||(this.moveX=null))}if(Gm(this,e,r,i,this.maxSpeed,this.hull.turn*(this.stun>0?0:1),14),this.gunCd-=e,this.gunCd<=0&&this.stun<=0){let e=this.attackOrder&&this.attackOrder.targetable&&this.dist(this.attackOrder)<=a+this.attackOrder.radius?this.attackOrder:t.findTarget(this,a,`hero`);this.target=e,e&&(t.combat.fireGuns(this,e),this.gunCd=this.hull.guns.cd*this.cdMul)}}},Ym=class extends Wm{constructor(e,t,n,r,i,a){super(e,`creep`,t);let o=r?bf.heavy:bf.light,s=1+bf.eraScale*(i-1);this.def=o,this.heavy=r,this.era=i,this.lane=n,this.maxHp=this.hp=Math.round(o.hp*s),this.dmg=o.dmg*s,this.radius=o.radius,this.armor=.05*(i-1),this.wp=a,this.wpi=1,this.gold=o.gold,this.xpVal=o.xp,this.rig=lm(i,r,t),e.scene.add(this.rig.root),this.gunKind=i<=1?`ball`:i>=5?`laser`:i>=4?`pulse`:`shell`}update(e){if(!this.alive)return;let t=this.G;this.stun=Math.max(0,this.stun-e),this.slowT=Math.max(0,this.slowT-e),this.hitFlash=Math.max(0,this.hitFlash-e);let n=this.def.range;this.retarget=(this.retarget||0)-e,(!this.target||!this.target.targetable||this.dist(this.target)>n*1.6||this.retarget<=0)&&(this.target=t.findTarget(this,n*1.5,`creep`),this.retarget=.5);let r=null,i=null;if(this.target&&this.dist(this.target)>n*.85)r=this.target.x,i=this.target.z;else if(!this.target){let e=this.wp[this.wpi];e&&(r=e.x,i=e.z,(e.x-this.x)**2+(e.z-this.z)**2<900&&this.wpi<this.wp.length-1&&this.wpi++)}r!==null&&df(t.obstacles,this.x,this.z,r,i,this.radius+2)&&((!this.path||!this.path.length||(this.pathT=(this.pathT||0)-e)<=0)&&(this.path=t.nav.findPath(this.x,this.z,r,i),this.pathT=1),this.path.length&&(r=this.path[0].x,i=this.path[0].z,(r-this.x)**2+(i-this.z)**2<100&&this.path.shift()));let a=this.slowT>0?1-this.slow:1;Gm(this,e,r,i,this.def.speed*a,1.8,14),this.gunCd-=e,this.gunCd<=0&&this.target&&this.target.targetable&&this.dist(this.target)<=n+this.target.radius&&this.stun<=0&&(t.combat.fireCreep(this,this.target),this.gunCd=this.def.cd*(.9+Math.random()*.2))}},Xm=class extends Wm{constructor(e,t){super(e,t.tier===`citadel`?`citadel`:`tower`,t.team),this.tier=t.tier,this.lane=t.lane;let n=xf[t.tier];this.def=n,this.maxHp=this.hp=n.hp,this.armor=n.armor,this.radius=n.radius,this.x=t.x,this.z=t.z,this.rig=Lm(t.tier,t.team),this.rig.root.position.set(this.x,0,this.z),this.rig.root.rotation.y=Math.atan2(-this.x,-this.z),e.scene.add(this.rig.root),this.era=1}get invulnerable(){return this.G.isStructureProtected(this)}update(e){if(!this.alive)return;let t=this.G;this.hitFlash=Math.max(0,this.hitFlash-e);let n=this.def.range;if(this.gunCd-=e,this.target&&(!this.target.targetable||this.dist(this.target)>n+this.target.radius)&&(this.target=null),this.aggroHero&&this.aggroHero.targetable&&this.dist(this.aggroHero)<=n&&(this.target=this.aggroHero),this.target||=t.findTarget(this,n,`tower`),this.rig.turret&&this.target){let t=Math.atan2(this.target.x-this.x,this.target.z-this.z)-this.rig.root.rotation.y,n=this.rig.turret.pivot;n.rotation.y+=Um(t-n.rotation.y)*Math.min(1,e*6)}this.gunCd<=0&&this.target&&(t.combat.fireStructure(this,this.target),this.gunCd=this.def.cd),this.aggroT=(this.aggroT||0)-e,this.aggroT<=0&&(this.aggroHero=null)}setEra(e){e!==this.era&&(this.era=e,this.rig.setEra&&this.rig.setEra(e))}},Zm=Math.PI,Qm=.625,$m=.125,eh=class{constructor(){this.list=[]}add(e,t,n,r=!1){let i=ip(e,t);n&&i.applyMatrix4(n);let a=i.attributes.uv;for(let e=0;e<a.count;e++)a.setXY(e,r?Qm:$m,.5);return this.list.push(i),i}mirror(e,t,n,r){this.add(e,t,n,r);let i=new tn().makeScale(-1,1,1).multiply(n||new tn),a=this.add(e,t,i,r),o=e=>{let t=e.array,n=e.itemSize;for(let r=0;r<e.count;r+=3)for(let e=0;e<n;e++){let i=(r+1)*n+e,a=(r+2)*n+e,o=t[i];t[i]=t[a],t[a]=o}};for(let e of Object.keys(a.attributes))o(a.attributes[e])}build(){let e=vd(this.list,!1);return e.computeBoundingSphere(),e.computeBoundingBox(),e}},th=new Map;function nh(e,{metalness:t=.4,roughness:n=.45,glow:r=3.5,flat:i=!1}={}){if(th.has(e))return th.get(e);let a=new Ya({color:16777215,vertexColors:!0,metalness:t,roughness:n,flatShading:i,emissive:16777215,emissiveIntensity:r,emissiveMap:qf()});return a.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
#ifdef USE_COLOR
 totalEmissiveRadiance *= vColor.rgb;
#endif`)},a.customProgramCacheKey=()=>`small-emissive-tint`,a.name=`small:`+e,th.set(e,a),a}function rh(e,t,n=0){return J(e,n-t/2,null,n+t/2,{base:!0})}var ih=15659508,ah=13225942,oh=2764339,sh=1713200,ch=16777215,lh=null;function uh(){if(lh)return lh;let e=nh(`drone`,{metalness:.35,roughness:.4,glow:3.2}),t=new eh;{let e=new Na([[0,-.95],[.16,-.9],[.2,-.3],[.19,.3],[.13,.7],[0,1.05]].map(e=>new z(e[0],e[1])),10);t.add(e,ih,q(0,0,0,Zm/2,0,0)),t.add(new La(.12,10,6,0,Zm*2,0,Zm/2),sh,q(0,.12,.35,0,0,0,1,.9,2.4)),t.add(rh([[.15,.45],[1.1,-.55],[1.1,-.72],[.15,-.72]],.05),ih),t.add(rh([[-.15,.45],[-1.1,-.55],[-1.1,-.72],[-.15,-.72]],.05),ih),t.add(rh([[1,-.5],[1.1,-.55],[1.1,-.72],[1,-.72]],.055),ah),t.add(rh([[-1,-.5],[-1.1,-.55],[-1.1,-.72],[-1,-.72]],.055),ah);for(let e of[-1,1]){let n=rh([[0,-.35],[0,-.85],[.5,-.95],[.45,-.7]],.04);t.add(n,ih,q(e*.16,.08,0,0,0,e*(Zm/2-.35))),t.add(rh([[.15,-.6],[.55,-.85],[.55,-.95],[.15,-.95]],.035),ah,q(0,0,0,0,0,0,e,1,1))}t.add(new Ki(.13,.15,.12,10,1),oh,q(0,0,-.98,Zm/2,0,0)),t.add(new Gi(.11,10),ch,q(0,0,-1.045,0,Zm,0),!0),t.add(new Wi(.08,.03,.08),ch,q(1.08,0,-.62),!0),t.add(new Wi(.08,.03,.08),ch,q(-1.08,0,-.62),!0)}let n=new eh;{let e=new Na([[0,-1.3],[.2,-1.2],[.3,-.4],[.3,.5],[.22,1],[0,1.35]].map(e=>new z(e[0],e[1])),10);n.add(e,ih,q(0,0,0,Zm/2,0,0,1,.85,1)),n.add(new La(.17,10,6,0,Zm*2,0,Zm/2),sh,q(0,.14,.7,0,0,0,1,.8,2)),n.add(rh([[.2,.35],[1.5,.05],[1.5,-.25],[.2,-.45]],.07),ih),n.add(rh([[-.2,.35],[-1.5,.05],[-1.5,-.25],[-.2,-.45]],.07),ih);for(let e of[-1,1])n.add(new Ki(.14,.16,1,10),ah,q(e*.75,-.08,.05,Zm/2,0,0)),n.add(new Ki(.1,.1,.06,10),oh,q(e*.75,-.08,.56,Zm/2,0,0)),n.add(new Gi(.11,10),ch,q(e*.75,-.08,-.46,0,Zm,0),!0),n.add(rh([[.2,-.9],[.9,-1.15],[.9,-1.3],[.2,-1.3]],.05),ih,q(0,0,0,0,0,0,e,1,1)),n.add(new Wi(.1,.03,.1),ch,q(e*1.48,0,-.1),!0);n.add(rh([[0,-.7],[0,-1.3],[.55,-1.35],[.5,-1.05]],.05),ih,q(0,.12,0,0,0,Zm/2)),n.add(new Wi(.28,.12,.7),oh,q(0,-.25,0))}let r=new eh;r.add(new Pa(.14,0),ih,q(0,0,0,0,Zm/4,0,1.2,.6,1.5));for(let e=0;e<4;e++){let t=Zm/4+e*Zm/2,n=Math.sin(t)*.33,i=Math.cos(t)*.33;r.add(dp(.025,.025,[0,0,0],[n,.02,i],5),ah),r.add(new Ki(.04,.04,.07,6),oh,q(n,.04,i)),r.add(new Ki(.13,.13,.012,12),oh,q(n,.08,i)),r.add(new Ra(.13,.012,3,12),ih,q(n,.08,i,Zm/2,0,0))}r.add(new La(.05,8,6),ch,q(0,-.01,.18),!0),r.add(new Wi(.1,.02,.1),ch,q(0,.09,-.02),!0);let i=new eh;i.add(new Ki(.42,.5,.16,8,1),ih,q(0,0,0,0,Zm/8,0)),i.add(new La(.3,12,6,0,Zm*2,0,Zm/2),ah,q(0,.08,0,0,0,0,1,.55,1)),i.add(new Ki(.5,.36,.12,8,1),oh,q(0,-.14,0,0,Zm/8,0)),i.add(new Ra(.58,.035,4,24),ch,q(0,0,0,Zm/2,0,0),!0),i.add(new La(.08,8,6),ch,q(0,.24,0),!0);for(let e=0;e<3;e++){let t=e*Zm*2/3;i.add(new Wi(.1,.06,.18),ah,q(Math.sin(t)*.58,0,Math.cos(t)*.58,0,t,0))}return i.add(new Gi(.16,10),ch,q(0,-.21,0,Zm/2,0,0),!0),lh={fighter:{geometry:t.build(),material:e},bomber:{geometry:n.build(),material:e},micro:{geometry:r.build(),material:e},shield:{geometry:i.build(),material:e}},lh}var dh=null;function fh(){if(dh)return dh;let e=(e,t=12)=>{let n=new Na(e.map(e=>new z(e[0],e[1])),t);return n.rotateX(Zm/2),n},t=new eh;t.add(new Ma(.4,2),3158582),t.add(new Ma(.2,1),16751184,q(0,0,-.26,0,0,0,1,1,.6),!0);let n=new eh;n.add(e([[0,-.62],[.17,-.6],[.18,-.2],[.18,.15],[.14,.42],[.07,.6],[0,.68]]),14199125),n.add(e([[.185,-.45],[.19,-.45],[.19,-.35],[.185,-.35]]),9067050),n.add(new Gi(.16,12),16752704,q(0,0,-.625,0,Zm,0),!0),n.add(new qi(.15,.5,10,1,!0),16742944,q(0,0,-.85,-Zm/2,0,0),!0);let r=new eh;r.add(e([[0,-1.5],[.08,-1.45],[.2,-1.1],[.22,-.8],[.22,1.1],[.18,1.35],[.08,1.48],[0,1.52]],14),4870232),r.add(e([[.225,.9],[.23,.9],[.23,1.15],[.2,1.3]],14),11745834);for(let e=0;e<4;e++)r.add(new Wi(.02,.5,.3),3817285,q(0,0,-1.25,0,0,e*Zm/2+Zm/4));r.add(new Ki(.16,.16,.02,3),10127952,q(0,0,-1.52,Zm/2,0,0)),r.add(new Gi(.06,8),10479871,q(0,0,-1.54,0,Zm,0),!0);let i=new eh;i.add(e([[0,-1.05],[.13,-1.05],[.14,.6],[.1,.9],[.04,1.08],[0,1.12]],12),15330543),i.add(e([[.141,.55],[.12,.8],[.04,1.08],[0,1.12]],12),2764339);for(let e=0;e<4;e++){let t=e*Zm/2;i.add(new Wi(.02,.45,.4),13225942,q(0,0,-.8,0,0,t).multiply(q(0,.2,0))),i.add(new Wi(.015,.2,.25),13225942,q(0,0,.3,0,0,t).multiply(q(0,.12,0)))}i.add(new qi(.12,.9,10,1,!0),16756816,q(0,0,-1.5,-Zm/2,0,0),!0),i.add(new Gi(.12,10),16769184,q(0,0,-1.06,0,Zm,0),!0);let a=new eh;a.add(J([[0,1.3],[.55,-1.1],[.35,-1.25],[-.35,-1.25],[-.55,-1.1]],-.08,[[0,1],[.25,-.9],[.18,-1.15],[-.18,-1.15],[-.25,-.9]],.22,{base:!0}),2764340),a.add(J([[0,1.32],[.08,.9],[-.08,.9]],-.09,null,.12,{base:!0}),16765088,null,!0);for(let e of[-1,1])a.add(new Wi(.05,.05,2),16751200,q(e*.3,-.02,.05,0,-e*.23,0),!0);a.add(new qi(.28,1.4,8,1,!0),16760960,q(0,.05,-1.9,-Zm/2,0,0),!0);let o=new eh;o.add(new Ma(.42,1),10476799,null,!0),o.add(new Ra(.7,.06,6,24),8046847,q(0,0,0,Zm/2,0,0),!0),o.add(new Ra(.6,.04,6,24),8046847,q(0,0,0,0,.6,0),!0);for(let e=0;e<4;e++){let t=e*Zm/2;o.add(new Wi(.16,.16,.3),3159355,q(Math.cos(t)*.52,Math.sin(t)*.52,0,0,0,t))}let s=nh(`proj-metal`,{metalness:.7,roughness:.35,glow:4}),c=nh(`proj-paint`,{metalness:.2,roughness:.45,glow:4.5}),l=nh(`proj-hot`,{metalness:.4,roughness:.4,glow:5,flat:!0});return dh={ball:{geometry:t.build(),material:s},shell:{geometry:n.build(),material:s},torpedo:{geometry:r.build(),material:s},missile:{geometry:i.build(),material:c},hypersonic:{geometry:a.build(),material:l},emp:{geometry:o.build(),material:c}},dh}var ph={y:0},mh=new tn,hh=new jt,gh=new B(1,1,1),_h=new B,vh=new B,yh=new B(0,0,1),bh=(e,t)=>e+Math.random()*(t-e),xh={ball:{mesh:`ball`,scale:1.1,glow:[1.6,.9,.4],glowSize:2.2,smoke:.55,arc:.2,snd:`cannon`},chain:{mesh:`ball`,scale:1.4,glow:[1.8,1,.5],glowSize:3,smoke:.6,arc:.12,snd:`cannon`,spin:!0},shell:{mesh:`shell`,scale:1,glow:[2.4,1.3,.5],glowSize:2.4,smoke:0,arc:.16,snd:`cannonHeavy`},shell_big:{mesh:`shell`,scale:1.7,glow:[2.8,1.5,.6],glowSize:3.8,smoke:.3,arc:.22,snd:`cannonHeavy`},flak:{mesh:`shell`,scale:.7,glow:[2.6,2,.9],glowSize:1.8,smoke:0,arc:.06,snd:`flak`},pulse:{mesh:`shell`,scale:.8,glow:[.6,1.8,3.2],glowSize:3.2,smoke:0,arc:.02,snd:`pulse`},torpedo:{mesh:`torpedo`,scale:1,glow:null,smoke:0,arc:0,snd:`torpedoLaunch`,water:!0},missile:{mesh:`missile`,scale:1,glow:[2.8,1.6,.7],glowSize:3,smoke:.8,arc:0,snd:`missile`},emp:{mesh:`emp`,scale:1.2,glow:[.6,1.4,3],glowSize:5,smoke:0,arc:.1,snd:`droneLaunch`},hypersonic:{mesh:`hypersonic`,scale:2,glow:[3,2.4,2],glowSize:9,smoke:1,arc:0,snd:`hypersonic`},bomb:{mesh:`shell`,scale:1.4,glow:null,smoke:0,arc:0,snd:`bombWhistle`}},Sh=class{constructor(e){this.G=e,this.list=[],this.mines=[],this.timers=[];let t=fh();this.inst={};for(let[n,r]of Object.entries({ball:700,shell:900,torpedo:150,missile:250,hypersonic:8,emp:16})){let i=t[n]||t.shell,a=new mi(i.geometry,i.material,r);a.count=0,a.frustumCulled=!1,a.instanceMatrix.setUsage(Ke),e.scene.add(a),this.inst[n]=a}let n=new La(1.1,12,8),r=new Ya({color:1842204,metalness:.7,roughness:.35});this.mineMesh=new mi(n,r,120),this.mineMesh.count=0,this.mineMesh.frustumCulled=!1,e.scene.add(this.mineMesh)}after(e,t){this.timers.push({t:e,fn:t})}damage(e,t,n,r={}){let i=this.G;if(!e||!e.alive)return 0;if((e.kind===`tower`||e.kind===`citadel`)&&e.invulnerable)return n&&n.isPlayer&&Math.random()<.15&&i.ui.floatText(e.x,18,e.z,`PROTECTED`,`#9ab`,14),0;let a=t*(1-(e.armor||0));if(e.buffs)for(let t of e.buffs)t.dmgTaken&&(a*=t.dmgTaken);n&&(n.kind===`tower`||n.kind===`citadel`)&&(a*=e.kind===`creep`?1.8:1+i.structureScale),n&&n.kind===`creep`&&(e.kind===`tower`||e.kind===`citadel`)&&(a*=.6);let o=0;e.shield>0&&(o=Math.min(e.shield,a),e.shield-=o,a-=o,o>0&&Math.random()<.3&&i.audio.play(`shieldHit`,{x:e.x,z:e.z,vol:.6})),e.hp-=a,e.hitFlash=.12;let s=n&&n.kind===`hero`?n:n&&n.owner&&n.owner.kind===`hero`?n.owner:null;if(s&&(e.damagers.set(s.id,i.time),s.dmgDealt+=a,e.kind===`hero`))for(let t of i.structures)t.alive&&t.team===e.team&&t.dist(s)<=t.def.range&&(t.aggroHero=s,t.aggroT=2.5);e.lastAttacker=s||n;let c=i.player;return c&&(s===c||e===c)&&a+o>=1&&(r.crit?i.ui.floatText(e.x,(e.rig?.height||8)+6,e.z,`✦`+Math.round(a+o),`#ffd24a`,24):(e===c||e.kind!==`creep`)&&i.ui.damageNumber(e,a+o,e===c)),e.hp<=0&&i.kill(e,s||n),a}splashDamage(e,t,n,r,i,a,o={}){let s=0;for(let c of this.G.units){if(!c.alive||c.team===i)continue;let l=n+c.radius*.6,u=(c.x-e)**2+(c.z-t)**2;if(u>l*l)continue;let d=o.falloff?1-.5*Math.sqrt(u)/l:1;this.damage(c,r*d,a,o),o.stun&&(c.stun=Math.max(c.stun,o.stun)),o.silence&&c.kind===`hero`&&(c.silence=Math.max(c.silence,o.silence)),o.slow&&(c.slow=o.slow,c.slowT=Math.max(c.slowT,o.slowDur||1.5)),s++}return s}ballistic(e,t,n,r,i,a,o,s={}){let c=Math.hypot(r-n.x,i-n.z),l=xh[t],u=Math.max(.12,c/a);this.list.push({type:`ballistic`,model:t,vis:l,owner:e,team:e.team,x0:n.x,y0:n.y,z0:n.z,x1:r,z1:i,T:u,t:0,arc:s.arc??c*l.arc,dmg:o,aoe:s.aoe||0,hitR:s.hitR??2.5,crit:s.crit,slow:s.slow,slowDur:s.slowDur,stun:s.stun,splashScale:s.splashScale||1,alive:!0,x:n.x,y:n.y,z:n.z,trailT:0,isAbility:s.isAbility})}straight(e,t,n,r,i,a,o,s,c={}){let l=xh[t];this.list.push({type:`straight`,model:t,vis:l,owner:e,team:e.team,x:n.x,y:l.water?-.25:Math.max(1.5,n.y),z:n.z,vx:r*a,vz:i*a,vy:0,dist:0,range:o,dmg:s,aoe:c.aoe||0,hitR:c.hitR||2.5,slow:c.slow,slowDur:c.slowDur,stun:c.stun,silence:c.silence,hit:new Set,pierce:c.pierce||!1,alive:!0,trailT:0,isAbility:!0,onExplode:c.onExplode})}homing(e,t,n,r,i,a,o={}){let s=xh[t],c=t===`missile`,l=o.launchYaw??e.yaw;this.list.push({type:`homing`,model:t,vis:s,owner:e,team:e.team,target:r,x:n.x,y:s.water?-.25:n.y+1,z:n.z,vx:c?bh(-3,3):Math.sin(l)*i*.6,vy:c?i*.55:0,vz:c?bh(-3,3):Math.cos(l)*i*.6,speed:i,turn:o.turn||3.2,dmg:a,aoe:o.aoe||0,life:o.life||5,t:0,lastX:r.x,lastZ:r.z,alive:!0,trailT:0,isAbility:!0,boost:c?.35:0})}skyStrike(e,t,n,r,i,a,o){let s=xh[t],c=Math.random()*6.28;this.list.push({type:`ballistic`,model:t,vis:s,owner:e,team:e.team,x0:n+Math.cos(c)*180,y0:260,z0:r+Math.sin(c)*180,x1:n,z1:r,T:i,t:0,arc:0,dmg:a,aoe:o,hitR:0,alive:!0,x:n,y:260,z:r,trailT:0,isAbility:!0,mega:t===`hypersonic`,splashScale:o/10})}addMine(e,t,n,r,i,a){this.mines.length>110&&this.mines.shift(),this.mines.push({owner:e,team:e.team,x:t,z:n,dmg:r,radius:i,life:a,t:0,arm:.8})}muzzleWorld(e,t,n){return t.getWorldPosition(n),n}aimTurrets(e,t){let n=e.rig;if(!n||!n.turrets)return;let r=Math.atan2(t.x-e.x,t.z-e.z)-e.yaw;for(let e of n.turrets)e.pivot.rotation.y=Math.atan2(Math.sin(r),Math.cos(r))}pickMuzzles(e,t,n){let r=e.rig,i=[],a=Math.atan2(t.x-e.x,t.z-e.z)-e.yaw,o=Math.sin(a)>=0?1:-1;if(r.turrets&&r.turrets.length){this.aimTurrets(e,t),r.root.updateMatrixWorld(!0);let a=r.turrets.flatMap(e=>e.muzzles);for(let t=0;t<n;t++)i.push(a[(e.salvoIdx=(e.salvoIdx||0)+1)%a.length])}else if(r.broadside&&r.broadside.length){let e=r.broadside.filter(e=>(e.userData.side??Math.sign(e.position.x||1))===o),t=e.length?e:r.broadside;for(let e=0;e<n;e++)i.push(t[Math.floor(Math.random()*t.length)])}return i}fireGuns(e,t){let n=this.G,r=e.hull.guns,i=this.pickMuzzles(e,t,r.count),a=e.aimSkill??.92;for(let o=0;o<r.count;o++)this.after(o*.09,()=>{if(!e.alive||!t.alive)return;let s=i[o];s?s.getWorldPosition(_h):_h.set(e.x,3,e.z);let c=t.isShip&&Math.random()<.1,l=r.dmg*e.dmgMul*(c?1.75:1);if(vh.set(t.x-_h.x,0,t.z-_h.z).normalize(),r.kind===`laser`){let r=new B(t.x,3,t.z);n.fx.beam(_h,r,n.teamGlow(e.team),1.1,.22),n.fx.hitSpark(r,.8,[1.2,1.8,3]),n.fx.muzzle(_h,vh,.6,`laser`),n.audio.play(`laser`,{x:e.x,z:e.z,vol:.5}),this.damage(t,l,e,{crit:c});return}let u=Math.hypot(t.x-_h.x,t.z-_h.z),d=u/r.speed,f=a,p=u*.035*(1.2-a)*(1+(n.storm||0)*.8)+(n.storm?1.5:0),m=t.x+(t.vx||0)*d*f+bh(-p,p),h=t.z+(t.vz||0)*d*f+bh(-p,p);this.ballistic(e,r.kind,_h.clone(),m,h,r.speed,l,{crit:c,hitR:2.5}),n.fx.muzzle(_h,vh,r.kind===`ball`?1.1:r.kind===`flak`?.7:1.3,r.kind),n.audio.play(xh[r.kind].snd,{x:_h.x,z:_h.z,vol:.55})})}fireCreep(e,t){let n=this.G;if(_h.set(e.x+Math.sin(e.yaw)*2,2.5,e.z+Math.cos(e.yaw)*2),vh.set(t.x-e.x,0,t.z-e.z).normalize(),e.gunKind===`laser`){n.fx.beam(_h,new B(t.x,3,t.z),n.teamGlow(e.team),.6,.15),this.damage(t,e.dmg,e),Math.random()<.3&&n.audio.play(`laser`,{x:e.x,z:e.z,vol:.25});return}let r=e.dist(t)/100;this.ballistic(e,e.gunKind===`ball`?`ball`:e.gunKind===`pulse`?`pulse`:`shell`,_h.clone(),t.x+(t.vx||0)*r*.7+bh(-2,2),t.z+(t.vz||0)*r*.7+bh(-2,2),100,e.dmg,{hitR:2.5,splashScale:.6}),n.fx.muzzle(_h,vh,.6,e.gunKind),Math.random()<.35&&n.audio.play(e.gunKind===`ball`?`cannon`:`cannonHeavy`,{x:e.x,z:e.z,vol:.3})}fireStructure(e,t){let n=this.G,r=e.rig.turret&&e.rig.turret.muzzles[0];r?r.getWorldPosition(_h):_h.set(e.x,20,e.z);let i=e.def.dmg*(1+n.structureScale*.5);if(e.era>=4)this.homing(e,`missile`,_h.clone(),t,120,i,{aoe:4,turn:5}),n.audio.play(`missile`,{x:e.x,z:e.z,vol:.6});else{let r=Math.hypot(t.x-_h.x,t.z-_h.z)/120;this.ballistic(e,`shell_big`,_h.clone(),t.x+(t.vx||0)*r*.95,t.z+(t.vz||0)*r*.95,120,i,{hitR:4,splashScale:1.2}),vh.set(t.x-e.x,.3,t.z-e.z).normalize(),n.fx.muzzle(_h,vh,1.6,`shell`),n.audio.play(`cannonHeavy`,{x:e.x,z:e.z,vol:.8})}}impact(e,t,n){let r=this.G,i=od(t,n,r.time,ph).y;if(e.aoe>0){let a=this.splashDamage(t,n,e.aoe,e.dmg,e.team,e.owner,{crit:e.crit,stun:e.stun,slow:e.slow,slowDur:e.slowDur,silence:e.silence,falloff:e.mega});e.mega?(r.fx.megaExplosion(new B(t,i,n),e.aoe),r.audio.play(`explosionBig`,{x:t,z:n,vol:1.3})):e.model===`emp`?(r.fx.emp(t,n,e.aoe),r.audio.play(`emp`,{x:t,z:n})):(r.fx.explosion(new B(t,i,n),Math.max(.7,e.aoe/9)*(e.splashScale||1)),r.audio.play(e.aoe>11?`explosionBig`:`explosion`,{x:t,z:n,vol:a?1:.7}));return}let a=null,o=1/0;for(let i of r.units){if(!i.alive||i.team===e.team||i.untargetable>0&&i.kind===`hero`)continue;let r=e.hitR+i.radius,s=(i.x-t)**2+(i.z-n)**2;s<r*r&&s<o&&(o=s,a=i)}if(a){this.damage(a,e.dmg,e.owner,{crit:e.crit}),e.slow&&(a.slow=e.slow,a.slowT=e.slowDur);let o=new B(t,Math.max(i+2,2.5),n);e.crit?(r.fx.explosion(o,.8,{water:!1}),r.audio.play(`explosion`,{x:t,z:n,vol:.8})):(r.fx.hitSpark(o,e.model===`shell_big`?1.3:.9),r.audio.play(`hit`,{x:t,z:n,vol:.45})),a.kind!==`hero`&&a.kind!==`creep`&&e.model===`shell_big`&&r.fx.explosion(o,.9,{water:!1})}else r.fx.splash(t,n,(e.model===`shell_big`?1.3:.85)*(e.splashScale||1)),Math.random()<.5&&r.audio.play(`splash`,{x:t,z:n,vol:.35})}update(e){let t=this.G;for(let t=this.timers.length-1;t>=0;t--){let n=this.timers[t];n.t-=e,n.t<=0&&(this.timers.splice(t,1),n.fn())}let n={ball:0,shell:0,torpedo:0,missile:0,hypersonic:0,emp:0};for(let r=this.list.length-1;r>=0;r--){let i=this.list[r];if(!i.alive){this.list.splice(r,1);continue}if(i.type===`ballistic`?this.stepBallistic(i,e):i.type===`straight`?this.stepStraight(i,e):this.stepHoming(i,e),!i.alive){this.list.splice(r,1);continue}let a=i.vis;i.trailT-=e,i.trailT<=0&&(i.trailT=.03,_h.set(i.x,i.y,i.z),a.glow&&t.fx.trailGlow(_h,a.glow,a.glowSize,.16),a.smoke&&t.fx.trailSmoke(_h,i.mega?3:1,.75,a.smoke*.5),a.water&&t.ocean.decals.add(i.x,i.z,2.2,1.8,0,.8,1.5));let o=a.mesh,s=this.inst[o];if(!s)continue;let c=n[o]++;c>=s.instanceMatrix.count||(vh.set(i.vx??0,i.vy??0,i.vz??0),vh.lengthSq()<1e-6&&vh.set(0,0,1),hh.setFromUnitVectors(yh,vh.normalize()),a.spin&&hh.multiply(new jt().setFromAxisAngle(yh,t.time*20)),gh.setScalar(a.scale),mh.compose(_h.set(i.x,i.y,i.z),hh,gh),s.setMatrixAt(c,mh))}for(let[e,t]of Object.entries(this.inst))t.count=n[e]||0,t.instanceMatrix.needsUpdate=!0;let r=0;for(let n=this.mines.length-1;n>=0;n--){let i=this.mines[n];if(i.t+=e,i.t>i.life){this.mines.splice(n,1);continue}let a=od(i.x,i.z,t.time,ph).y;if(i.t>i.arm){let e=!1;for(let n of t.units)if(n.alive&&n.team!==i.team&&n.isShip&&(n.x-i.x)**2+(n.z-i.z)**2<(n.radius+5)**2){e=!0;break}if(e){this.splashDamage(i.x,i.z,i.radius,i.dmg,i.team,i.owner),t.fx.explosion(new B(i.x,a,i.z),1.4),t.audio.play(`explosionBig`,{x:i.x,z:i.z}),this.mines.splice(n,1);continue}Math.sin(i.t*6)>.9&&t.fx.trailGlow(new B(i.x,a+1.2,i.z),i.team===0?[.5,1.2,3]:[3,.5,.3],2.4,.2)}mh.makeTranslation(i.x,a+.2,i.z),this.mineMesh.setMatrixAt(r++,mh)}this.mineMesh.count=r,this.mineMesh.instanceMatrix.needsUpdate=!0}stepBallistic(e,t){e.t+=t;let n=Math.min(1,e.t/e.T),r=e.x0+(e.x1-e.x0)*n,i=e.z0+(e.z1-e.z0)*n,a=e.y0*(1-n)+4*e.arc*n*(1-n);e.vx=(r-e.x)/t,e.vy=(a-e.y)/t,e.vz=(i-e.z)/t,e.x=r,e.y=a,e.z=i,n>=1&&(e.alive=!1,this.impact(e,e.x1,e.z1))}stepStraight(e,t){let n=this.G;e.x+=e.vx*t,e.z+=e.vz*t,e.dist+=Math.hypot(e.vx,e.vz)*t,e.vis.water&&(e.y=od(e.x,e.z,n.time,ph).y-.3);for(let t of n.units){if(!t.alive||t.team===e.team||e.hit.has(t.id)||t.kind===`hero`&&t.untargetable>0&&!e.aoe)continue;let r=e.hitR+t.radius;if((t.x-e.x)**2+(t.z-e.z)**2<r*r){if(e.aoe){e.alive=!1,this.impact(e,e.x,e.z);return}e.hit.add(t.id),this.damage(t,e.dmg,e.owner),e.slow&&(t.slow=e.slow,t.slowT=e.slowDur),e.stun&&(t.stun=Math.max(t.stun,e.stun));let r=new B(e.x,3,e.z);if(e.model===`torpedo`?(n.fx.explosion(r,1.3),n.fx.splash(e.x,e.z,2.2),n.audio.play(`explosionBig`,{x:e.x,z:e.z})):(n.fx.hitSpark(r,1.1),n.audio.play(`hit`,{x:e.x,z:e.z,vol:.6})),!e.pierce){e.alive=!1;return}}}e.dist>=e.range&&(e.alive=!1,e.aoe?this.impact(e,e.x,e.z):n.fx.splash(e.x,e.z,e.model===`torpedo`?1.2:.8));for(let t of n.obstacles)if((e.x-t.x)**2+(e.z-t.z)**2<t.r*t.r){e.alive=!1,n.fx.explosion(new B(e.x,2,e.z),.8,{water:!1});return}}stepHoming(e,t){let n=this.G;e.t+=t,e.target&&e.target.alive&&(e.lastX=e.target.x,e.lastZ=e.target.z);let r=e.vis.water,i=r?-.25:2.5,a;e.boost>0?(e.boost-=t,a=vh.set(e.vx*.2,e.speed,e.vz*.2)):a=vh.set(e.lastX-e.x,(i-e.y)*+!r+(r?0:Math.min(20,Math.hypot(e.lastX-e.x,e.lastZ-e.z)*.15)),e.lastZ-e.z),a.normalize().multiplyScalar(e.speed);let o=Math.min(1,e.turn*t*(e.boost>0?3:1));e.vx+=(a.x-e.vx)*o,e.vy+=(a.y-e.vy)*o,e.vz+=(a.z-e.vz)*o,e.x+=e.vx*t,e.y+=e.vy*t,e.z+=e.vz*t,r&&(e.y=od(e.x,e.z,n.time,ph).y-.3);let s=(e.target&&e.target.alive?e.target.radius:2)+1.5,c=(e.lastX-e.x)**2+(e.lastZ-e.z)**2;if(c<s*s&&(r||e.y<8)||e.t>e.life||!r&&e.y<-.5){if(e.alive=!1,e.aoe){this.impact(e,e.x,e.z);return}e.target&&e.target.alive&&c<s*s*2&&this.damage(e.target,e.dmg,e.owner);let t=new B(e.x,Math.max(2,e.y),e.z);n.fx.explosion(t,r?1.3:1),n.audio.play(r?`explosionBig`:`explosion`,{x:e.x,z:e.z,vol:.8})}}interceptNear(e,t,n,r,i=3){let a=this.G,o=0;for(let s of this.list){if(o>=i)break;if(!(!s.alive||s.team===e||s.type!==`homing`&&s.model!==`hypersonic`)&&(s.x-t)**2+(s.z-n)**2<r*r){s.alive=!1,o++;let r=new B(s.x,s.y,s.z);a.fx.hitSpark(r,1,[3,2,1]),a.fx.beam(new B(t,6,n),r,e===0?6737151:16737860,.5,.12)}}return o}},Ch={micro:900,fighter:220,bomber:90,shield:60},wh={micro:64,fighter:62,bomber:50,shield:0},Th=new tn,Eh=new jt,Dh=new B(1,1,1),Oh=new B,kh=new B;new B(0,0,1),new B(0,1,0);var Ah=new fn(0,0,0,`YXZ`),jh={y:0},Mh=(e,t)=>e+Math.random()*(t-e),Nh=class{constructor(e){this.G=e,this.list=[],this.inst={};let t=uh();for(let n of Object.keys(Ch)){let r=t[n],i=new mi(r.geometry,r.material,Ch[n]);i.count=0,i.frustumCulled=!1,i.castShadow=n!==`micro`,i.instanceMatrix.setUsage(Ke),i.setColorAt(0,new V(1,1,1)),e.scene.add(i),this.inst[n]=i}this.teamCol=[new V(.55,.8,1.2),new V(1.25,.55,.45)]}get activeCount(){return this.list.length}launch(e,t,n,r,i,a={}){let o=this.G,s=e.rig;s&&s.launch?s.launch.getWorldPosition(Oh):Oh.set(e.x,6,e.z);for(let o=0;o<n;o++){let n=t===`micro`?o*.025:o*.12;this.list.push({type:t,owner:e,team:e.team,x:Oh.x+Mh(-2,2),y:Oh.y+Mh(0,2),z:Oh.z+Mh(-2,2),vx:Math.sin(e.yaw)*10+Mh(-6,6),vy:t===`micro`?Mh(14,24):8,vz:Math.cos(e.yaw)*10+Mh(-6,6),tx:r,tz:i,t:-n,life:a.dur||10,dmg:a.dmg||20,radius:a.radius||5,fireCd:a.fireCd||.4,gunT:Mh(0,.4),target:null,phase:Math.random()*6.28,alt:t===`micro`?Mh(7,16):t===`bomber`?34:Mh(16,26),dropped:!1,alive:!0,hp:t===`bomber`?3:t===`fighter`?2:1,bank:0,idx:o,orbitR:a.orbitR||12})}o.audio.play(`droneLaunch`,{x:e.x,z:e.z,vol:Math.min(1.2,.5+n*.02)})}shootDown(e,t,n,r,i){let a=this.G,o=0;for(let s of this.list){if(o>=i)break;if(!(!s.alive||s.team===e||s.t<0||s.type===`shield`)&&(s.x-t)**2+(s.z-n)**2<r*r){s.hp--,o++;let r=new B(s.x,s.y,s.z);a.fx.beam(new B(t,7,n),r,e===0?8969727:16746598,.35,.1),s.hp<=0&&(s.alive=!1,a.fx.hitSpark(r,.7,[3,2,.8]),a.fx.spawnDebris(r,.3))}}return o}popShields(e){for(let t of this.list)t.type===`shield`&&t.owner===e&&t.alive&&(t.alive=!1,this.G.fx.hitSpark(new B(t.x,t.y,t.z),.6,[.6,1.6,3]))}acquire(e,t){let n=this.G,r=null,i=t*t,a=e.type===`micro`?(e.x+e.tx)*.5:e.tx,o=e.type===`micro`?(e.z+e.tz)*.5:e.tz;for(let t of n.units){if(!t.alive||t.team===e.team||t.kind===`hero`&&t.untargetable>0||(t.kind===`tower`||t.kind===`citadel`)&&t.invulnerable)continue;let n=(t.x-a)**2+(t.z-o)**2,s=t.kind===`hero`?.6:1;n*s<i&&(i=n*s,r=t)}return r}update(e){let t=this.G,n={micro:0,fighter:0,bomber:0,shield:0},r=0;for(let i=this.list.length-1;i>=0;i--){let a=this.list[i];if(!a.alive||!a.owner.alive&&a.type===`shield`){this.list.splice(i,1);continue}if(a.t+=e,a.t<0)continue;if(a.t>a.life&&a.type!==`shield`&&!(a.type===`micro`&&a.target&&a.target.alive)){a.alive=!1,t.fx.hitSpark(Oh.set(a.x,a.y,a.z),.4),this.list.splice(i,1);continue}if(a.type===`micro`?this.stepMicro(a,e):a.type===`fighter`?this.stepFighter(a,e):a.type===`bomber`?this.stepBomber(a,e):this.stepShield(a,e),!a.alive){this.list.splice(i,1);continue}(a.x-t.listener.x)**2+(a.z-t.listener.z)**2<32400&&r++;let o=this.inst[a.type],s=n[a.type]++;if(s>=Ch[a.type])continue;let c=Math.atan2(a.vx,a.vz),l=Math.hypot(a.vx,a.vz),u=-Math.atan2(a.vy,l+.001);if(Ah.set(u*.8,c,a.bank),Eh.setFromEuler(Ah),Dh.setScalar(a.type===`micro`?1.9:a.type===`fighter`?1.5:(a.type,1.4)),Th.compose(Oh.set(a.x,a.y,a.z),Eh,Dh),o.setMatrixAt(s,Th),o.setColorAt(s,this.teamCol[a.team]),a.type!==`micro`||(a.idx+(t.frame|0))%2==0){let e=a.team===0?[.6,1.5,3.6]:[3.6,1,.45];t.fx.trailGlow(Oh,e,a.type===`micro`?2:3,a.type===`micro`?.22:.3)}}for(let[e,t]of Object.entries(this.inst))t.count=n[e],t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0);t.audio.setSwarm(r)}steer(e,t,n,r,i,a,o){kh.set(t-e.x,n-e.y,r-e.z);let s=kh.length()||1;kh.multiplyScalar(i/s);let c=Math.min(1,a*o),l=e.vx,u=e.vz;e.vx+=(kh.x-e.vx)*c,e.vy+=(kh.y-e.vy)*c,e.vz+=(kh.z-e.vz)*c;let d=l*e.vz-u*e.vx;return e.bank+=(At.clamp(-d*.004,-1.1,1.1)-e.bank)*Math.min(1,o*5),e.x+=e.vx*o,e.y+=e.vy*o,e.z+=e.vz*o,s}stepMicro(e,t){let n=this.G;e.retarget=(e.retarget||0)-t,(!e.target||!e.target.alive)&&e.retarget<=0&&(e.target=this.acquire(e,90),e.retarget=.4);let r=e.t,i=Math.sin(r*3.1+e.phase)*6,a=Math.cos(r*2.7+e.phase*1.3)*6,o=Math.sin(r*4+e.phase)*2,s,c,l,u=wh.micro;if(e.target&&e.target.alive&&r>.5){let t=Math.hypot(e.target.x-e.x,e.target.z-e.z),r=+(t<30);if(s=e.target.x+i*(1-r),l=e.target.z+a*(1-r),c=r?2.5:e.alt+o,u*=r?1.35:1,t<e.target.radius+2&&e.y<7){e.alive=!1,n.combat.splashDamage(e.x,e.z,e.radius,e.dmg*e.owner.dmgMul,e.team,e.owner);let t=new B(e.x,Math.max(e.y,2),e.z);n.fx.explosion(t,.45,{water:!1}),n.audio.play(`dronePop`,{x:e.x,z:e.z,vol:.5});return}}else s=e.tx+i*2,l=e.tz+a*2,c=e.alt+o;this.steer(e,s,c,l,u,r<.5?1.5:4.5,t),e.y<.5&&(e.alive=!1,n.fx.splash(e.x,e.z,.4))}stepFighter(e,t){let n=this.G;e.retarget=(e.retarget||0)-t,(!e.target||!e.target.alive)&&e.retarget<=0&&(e.target=this.acquire(e,90),e.retarget=.6);let r=e.target&&e.target.alive?e.target.x:e.tx,i=e.target&&e.target.alive?e.target.z:e.tz,a=e.t*1.1+e.phase,o=22+e.idx%3*6,s=r+Math.cos(a)*o,c=i+Math.sin(a)*o;if(this.steer(e,s,e.alt,c,wh.fighter,2.2,t),e.gunT-=t,e.target&&e.target.alive&&e.gunT<=0&&Math.hypot(e.target.x-e.x,e.target.z-e.z)<55){e.gunT=e.fireCd;let t=new B(e.x,e.y,e.z),r=new B(e.target.x+Mh(-2,2),2.5,e.target.z+Mh(-2,2));n.fx.beam(t,r,e.team===0?16769184:16760960,.25,.08),n.fx.hitSpark(r,.5),n.combat.damage(e.target,e.dmg*e.owner.dmgMul,e.owner),Math.random()<.2&&n.audio.play(`flak`,{x:e.x,z:e.z,vol:.25,pitch:1.6})}}stepBomber(e,t){let n=this.G;if(e.dropped)this.steer(e,e.x+e.vx,e.alt,e.z+e.vz,wh.bomber*1.2,1,t);else{let r=this.steer(e,e.tx,e.alt,e.tz,wh.bomber,1.8,t),i=Math.hypot(e.tx-e.x,e.tz-e.z);if(i<26&&(e.alt=Math.max(14,e.alt-40*t)),i<8||r<10){e.dropped=!0;let t=e.owner,r=e.tx+Mh(-3,3),i=e.tz+Mh(-3,3);n.combat.ballistic(t,`bomb`,new B(e.x,e.y,e.z),r,i,55,e.dmg*t.dmgMul,{aoe:e.radius,arc:0}),n.audio.play(`bombWhistle`,{x:r,z:i,vol:.7}),e.alt=60,e.life=e.t+3}}}stepShield(e,t){let n=e.owner,r=e.t*2.2+e.idx/6*Math.PI*2,i=od(n.x,n.z,this.G.time,jh).y,a=n.x+Math.cos(r)*e.orbitR,o=n.z+Math.sin(r)*e.orbitR;e.vx=(a-e.x)/Math.max(t,.001),e.vz=(o-e.z)/Math.max(t,.001),e.vy=0,e.x=a,e.z=o,e.y=i+8+Math.sin(e.t*3+e.idx)*1.2,e.bank=.4,(n.shield<=0||!n.alive)&&(e.alive=!1)}},Ph=new B,Fh=(e,t)=>e+Math.random()*(t-e);function Ih(e,t=new B){let n=e.rig;return n&&n.launch?n.launch.getWorldPosition(t):t.set(e.x,4,e.z),t}function Lh(e,t=new B){let n=e.rig,r=n&&(n.turrets?.[0]?.muzzles?.[0]||n.broadside?.[0]);return r?r.getWorldPosition(t):t.set(e.x+Math.sin(e.yaw)*6,4,e.z+Math.cos(e.yaw)*6),t}function Rh(e,t,n,r=()=>!0){return e.units.filter(e=>e.alive&&e.team!==t.team&&e.targetable&&t.dist(e)<=n+e.radius&&!e.invulnerable&&r(e)).sort((e,n)=>(e.kind===`hero`?0:1)-(n.kind===`hero`?0:1)||t.dist2(e)-t.dist2(n))}function zh(e,t){let n=e.abilities[t];return!(!e.alive||e.stun>0||e.silence>0||e.cds[t]>0||n.minLevel&&e.level<n.minLevel)}function Bh(e,t,n,r,i){if(!zh(t,n))return!1;let a=t.abilities[n],o=t.dmgMul,s=r-t.x,c=i-t.z,l=Math.hypot(s,c)||1;switch(s/=l,c/=l,a.target===`point`&&l>a.range&&(r=t.x+s*a.range,i=t.z+c*a.range,l=a.range),a.type){case`projectile`:{let n=Lh(t),r=a.count;for(let i=0;i<r;i++){let l=r>1?(i/(r-1)-.5)*a.spread:0,u=a.model===`ball`&&r>3?Fh(-.05,.05):0,d=Math.atan2(s,c)+l+u;e.combat.straight(t,a.model,n.clone(),Math.sin(d),Math.cos(d),a.speed*(r>3?Fh(.85,1.1):1),a.range,a.dmg*o,{aoe:a.model===`shell_big`||a.model===`emp`?a.radius:0,hitR:a.radius>6?3:a.radius,slow:a.slow,slowDur:a.slowDur,stun:a.stun,silence:a.model===`emp`?a.stun:0})}e.fx.muzzle(n,new B(s,.1,c),a.model===`torpedo`?.8:1.6,a.model===`emp`?`laser`:`ball`),e.audio.play(a.model===`torpedo`?`torpedoLaunch`:a.model===`emp`?`droneLaunch`:r>3?`cannon`:`cannonHeavy`,{x:t.x,z:t.z,vol:1}),r>3&&e.audio.play(`cannon`,{x:t.x,z:t.z,vol:.8,pitch:.8});break}case`barrage`:if(a.model===`hypersonic`)e.combat.skyStrike(t,`hypersonic`,r,i,a.delay,a.dmg*o,a.radius),e.fx.ring(r,i,a.radius,a.radius,16728112,a.delay,.05),e.fx.ring(r,i,a.radius*1.2,2,16744544,a.delay,.08),e.audio.play(`missile`,{x:t.x,z:t.z,vol:1.2,pitch:.7}),e.audio.play(`hypersonic`,{x:r,z:i,vol:1});else{Lh(t),e.fx.ring(r,i,a.area+4,a.area+4,e.teamGlow(t.team),a.delay+a.spreadTime,.04);for(let n=0;n<a.count;n++)e.combat.after(n/a.count*a.spreadTime,()=>{if(!t.alive)return;let s=Math.random()*6.283,c=Math.sqrt(Math.random())*a.area,l=r+Math.cos(s)*c,u=i+Math.sin(s)*c;Lh(t,Ph);let d=Math.hypot(l-Ph.x,u-Ph.z),f=d/a.delay;e.combat.ballistic(t,a.model,Ph.clone(),l,u,f,a.dmg*o,{aoe:a.radius,arc:d*.3+20}),e.fx.muzzle(Ph,new B(l-t.x,.5,u-t.z).normalize(),a.model===`shell_big`?1.8:1.2,a.model===`ball`?`ball`:`shell`),n%2==0&&e.audio.play(a.model===`ball`?`cannon`:`cannonHeavy`,{x:t.x,z:t.z,vol:.9})});e.fx.shake(.15,t.x,t.z)}break;case`volley`:{let n=Rh(e,t,a.range);if(!n.length)return!1;for(let r=0;r<a.count;r++)e.combat.after(r/a.count*a.spreadTime,()=>{if(!t.alive)return;let i=n[r%n.length];if(!i.alive)return;let s=e.combat.pickMuzzles(t,i,1)[0];s?s.getWorldPosition(Ph):Lh(t,Ph);let c=Math.hypot(i.x-Ph.x,i.z-Ph.z);e.combat.ballistic(t,a.model,Ph.clone(),i.x+(i.vx||0)*c/130+Fh(-3,3),i.z+(i.vz||0)*c/130+Fh(-3,3),130,a.dmg*o,{aoe:a.radius}),e.fx.muzzle(Ph,new B(i.x-t.x,.2,i.z-t.z).normalize(),1.7,`shell`),r%2==0&&e.audio.play(`cannonHeavy`,{x:t.x,z:t.z,vol:1})});e.fx.shake(.4,t.x,t.z);break}case`homing`:{let n=Rh(e,t,a.range);if(!n.length)return!1;for(let r=0;r<a.count;r++)e.combat.after(r*(a.model===`missile`?.08:.12),()=>{if(!t.alive)return;let i=n[r%n.length];i.alive&&(Ih(t,Ph),Ph.x+=Fh(-3,3),Ph.z+=Fh(-3,3),e.combat.homing(t,a.model,Ph.clone(),i,a.speed,a.dmg*o,{aoe:a.radius,turn:a.model===`torpedo`?2.2:3.4,life:6,launchYaw:t.yaw+(r%2?1:-1)*.6}),a.model===`missile`&&e.fx.muzzle(Ph,new B(0,1,0),1,`shell`),e.audio.play(a.model===`missile`?`missile`:`torpedoLaunch`,{x:t.x,z:t.z,vol:.7}))});a.model===`missile`&&e.audio.play(`missileRipple`,{x:t.x,z:t.z});break}case`buff`:{let n={t:0,dur:a.dur};a.speedMul&&(n.speedMul=a.speedMul,e.audio.play(`engineBoost`,{x:t.x,z:t.z,variant:t.age<=2?`steam`:void 0})),a.dmgTaken&&(n.dmgTaken=a.dmgTaken),a.healPct&&(n.healPerSec=t.maxHp*a.healPct/a.dur,e.audio.play(`heal`,{x:t.x,z:t.z})),a.shield&&(t.shield=a.shield*t.lvlMul,t.shieldT=a.dur,e.audio.play(`shield`,{x:t.x,z:t.z}),a.drones&&e.drones.launch(t,`shield`,a.drones,t.x,t.z,{dur:a.dur,orbitR:t.radius+6})),t.buffs.push(n),e.fx.ring(t.x,t.z,t.radius,t.radius*3,a.healPct?6356880:a.shield?6737151:16777215,.6,.08),a.speedMul&&(t.boostFx=a.dur);break}case`dash`:t.dash={t:0,dur:.55,dx:s,dz:c,speed:a.range/.55,dmg:a.dmg*o,stun:a.stun,hit:new Set,radius:a.radius},e.audio.play(`engineBoost`,{x:t.x,z:t.z,pitch:.8,variant:`steam`});break;case`smoke`:e.smokes.push({x:t.x,z:t.z,r:a.radius,t:0,dur:a.dur,team:t.team});for(let n=0;n<50;n++){let n=Math.random()*6.283,r=Math.sqrt(Math.random())*a.radius;e.fx.p.alpha.emit({x:t.x+Math.cos(n)*r,y:Fh(1,6),z:t.z+Math.sin(n)*r,vx:Fh(-1,1),vy:Fh(.3,1.2),vz:Fh(-1,1),life:a.dur+Fh(0,1.5),s0:8,s1:Fh(18,26),r:.72,g:.74,b:.76,a0:.8,a1:0,kind:1,drag:.5})}e.audio.play(`smoke`,{x:t.x,z:t.z});break;case`mines`:for(let n=0;n<a.count;n++)e.combat.after(n*.22,()=>{if(!t.alive)return;let n=t.x-Math.sin(t.yaw)*(t.radius+3)+Fh(-3,3),r=t.z-Math.cos(t.yaw)*(t.radius+3)+Fh(-3,3);e.combat.addMine(t,n,r,a.dmg*o,a.radius,a.dur),e.fx.splash(n,r,.5),e.audio.play(`mineDrop`,{x:n,z:r,vol:.6})});break;case`swarm`:{let n=a.target===`point`?r:t.x,o=a.target===`point`?i:t.z;e.drones.launch(t,a.drone,a.count,n,o,{dur:a.dur,dmg:a.dmg,radius:a.radius||5,fireCd:a.fireCd}),a.extra&&e.drones.launch(t,a.extra.drone,a.extra.count,n,o,{dur:a.dur,dmg:220,radius:15}),a.count>=20&&e.fx.shake(.12,t.x,t.z);break}case`beam`:{let n=Lh(t),r=new B(t.x+s*a.range,3,t.z+c*a.range);for(let n of e.units){if(!n.alive||n.team===t.team)continue;let r=n.x-t.x,i=n.z-t.z,l=r*s+i*c;l<0||l>a.range||Math.abs(r*c-i*s)<a.width+n.radius&&(e.combat.damage(n,a.dmg*o,t),e.fx.hitSpark(new B(n.x,3,n.z),1.6,[.8,1.6,3]))}e.fx.beam(n,r,e.teamGlow(t.team),3.2,.5),e.fx.beam(n,r,16777215,1,.25);for(let t=0;t<30;t++){let i=t/30;e.fx.p.add.emit({x:n.x+(r.x-n.x)*i,y:3+Fh(-1,1),z:n.z+(r.z-n.z)*i,vx:Fh(-4,4),vy:Fh(0,6),vz:Fh(-4,4),life:Fh(.3,.7),s0:1.2,s1:.1,r:.8,g:1.6,b:3,a0:1,a1:0,kind:2}),t%3==0&&e.ocean.decals.add(n.x+(r.x-n.x)*i,n.z+(r.z-n.z)*i,5,2,0,.8,1)}e.fx.muzzle(n,new B(s,0,c),2.2,`laser`),e.renderer.shockwave(n,.8,.4),e.fx.shake(.3,t.x,t.z),e.audio.play(`rail`,{x:t.x,z:t.z,vol:1.2}),t.pushX=-s*18,t.pushZ=-c*18;break}case`pointdefense`:t.pd={t:0,dur:a.dur,radius:a.radius,laser:!!a.laser,tick:0},e.audio.play(a.laser?`laser`:`flak`,{x:t.x,z:t.z,vol:1}),e.fx.ring(t.x,t.z,a.radius,a.radius,a.laser?6741503:16764006,a.dur,.03);break;default:return!1}return t.cds[n]=a.cd*t.cdMul,e.events.emit(`cast`,{hero:t,ability:a,x:r,z:i}),!0}function Vh(e,t,n){if(t.dash){let r=t.dash;r.t+=n,t.pushX=r.dx*r.speed,t.pushZ=r.dz*r.speed,t.yaw=Math.atan2(r.dx,r.dz);for(let n of e.units)n.alive&&n.team!==t.team&&!r.hit.has(n.id)&&n.isShip&&t.dist(n)<t.radius+n.radius+2&&(r.hit.add(n.id),e.combat.damage(n,r.dmg,t),n.stun=Math.max(n.stun,r.stun),n.pushX=r.dx*30,n.pushZ=r.dz*30,e.fx.explosion(new B((t.x+n.x)/2,3,(t.z+n.z)/2),.9,{water:!1}),e.audio.play(`ram`,{x:n.x,z:n.z}),e.fx.shake(.35,n.x,n.z));for(let n=0;n<3;n++)e.fx.p.alpha.emit({x:t.x+r.dx*t.radius,y:1,z:t.z+r.dz*t.radius,vx:Fh(-8,8),vy:Fh(6,14),vz:Fh(-8,8),life:.8,s0:2,s1:5,r:.95,g:.97,b:1,a0:.8,a1:0,kind:3,grav:20});r.t>=r.dur&&(t.dash=null)}if(t.pd){let r=t.pd;if(r.t+=n,r.tick-=n,r.tick<=0&&(r.tick=.12,e.drones.shootDown(t.team,t.x,t.z,r.radius,r.laser?4:3)+e.combat.interceptNear(t.team,t.x,t.z,r.radius,2)&&Math.random()<.5&&e.audio.play(r.laser?`laser`:`flak`,{x:t.x,z:t.z,vol:.5}),!r.laser))for(let n=0;n<3;n++){let n=Math.random()*6.283,i=Fh(10,r.radius),a=new B(t.x+Math.cos(n)*i,Fh(10,22),t.z+Math.sin(n)*i);e.fx.p.add.emit({x:a.x,y:a.y,z:a.z,life:.1,s0:3,s1:5,r:2.5,g:1.8,b:.8,a0:1,a1:0}),e.fx.p.alpha.emit({x:a.x,y:a.y,z:a.z,life:1.4,s0:2,s1:5,r:.2,g:.2,b:.2,a0:.6,a1:0,kind:1})}r.t>=r.dur&&(t.pd=null)}if(t.boostFx>0){t.boostFx-=n;let r=t.x+Math.sin(t.yaw)*t.rig.length*.45,i=t.z+Math.cos(t.yaw)*t.rig.length*.45;e.fx.p.alpha.emit({x:r,y:.8,z:i,vx:Math.cos(t.yaw)*Fh(-9,9),vy:Fh(4,9),vz:-Math.sin(t.yaw)*Fh(-9,9),life:.7,s0:1.5,s1:4,r:.95,g:.97,b:1,a0:.7,a1:0,kind:3,grav:18})}if(t.shield>0&&e.frame%3==0){let n=Math.random()*6.283,r=Fh(0,1.4),i=t.radius+4;e.fx.p.add.emit({x:t.x+Math.cos(n)*Math.cos(r)*i,y:3+Math.sin(r)*i*.6,z:t.z+Math.sin(n)*Math.cos(r)*i,life:.4,s0:2.4,s1:.5,r:.4,g:1,b:2.2,a0:.8,a1:0})}t.shieldWas>0&&t.shield<=0&&e.drones.popShields(t),t.shieldWas=t.shield}var Hh=(e,t)=>e+Math.random()*(t-e),Uh=class{constructor(e,t,n){this.G=e,this.h=t,this.d=n,this.thinkT=Hh(0,.5),this.state=`lane`,this.branch=Math.random()<.5?0:1,this.upgOrder=Gh([`plating`,`gunnery`,`reload`,`engines`,`repair`],t.slot),t.aimSkill=n.aim,this.lastHp=t.hp,this.dest=null}update(e){let t=this.h,n=this.G;if(!t.alive){this.state=`lane`,this.shop();return}if(this.thinkT-=e,this.thinkT>0)return;this.thinkT=this.d.react*Hh(.6,1.2);let r=this.lastHp-t.hp;this.lastHp=t.hp,this.shop();let i=t.hp/t.maxHp,a=n.heroes.filter(e=>e.alive&&e.team!==t.team&&t.dist(e)<170&&e.targetable),o=n.heroes.filter(e=>e.alive&&e.team===t.team&&e!==t&&t.dist(e)<170),s=a.reduce((e,t)=>e+t.hp*t.dmgMul,0),c=o.reduce((e,t)=>e+t.hp*t.dmgMul,0)+t.hp*t.dmgMul,l=s>c*1.35;if(this.state===`retreat`?i>.92&&(this.state=`lane`):(i<.28||i<.45&&l||i<.6&&this.inEnemyTowerRange()&&r>0&&!this.creepsTanking())&&(this.state=`retreat`),this.state===`retreat`){let e=lf(t.team);this.go(e.x,e.z),this.tryDefensive(a,!0,r);return}let u=null,d=-1/0;for(let e of a){let n=e.hp/e.maxHp,r=this.enemyTowerCovers(e.x,e.z),i=(1-n)*2+t.dmgMul*t.hp/(e.dmgMul*e.hp+1)-t.dist(e)/200;r&&n>.2&&(i-=2),i>d&&(d=i,u=e)}let f=this.d.aggression+(c>s?.2:-.2),p=u&&(d>1.2-f||u.hp/u.maxHp<.3)&&i>.4;if(this.tryAbilities(a,u,r),p){this.state=`fight`;let e=t.hull.guns.range;if(t.dist(u)>e*.9)this.go(u.x+(u.vx||0)*.8,u.z+(u.vz||0)*.8);else{let n=t.x-u.x,r=t.z-u.z,i=Math.hypot(n,r)||1,a=t.slot%2?1:-1;this.go(u.x+n/i*e*.75+-r/i*25*a,u.z+r/i*e*.75+n/i*25*a)}t.attackOrder=u;return}if(this.state===`fight`&&(this.state=`lane`,t.attackOrder=null),this.state!==`capture`&&Math.random()<.06&&i>.6){let e=n.ports.find(e=>e.owner!==t.team&&t.dist(e)<260&&!n.heroes.some(n=>n.alive&&n.team!==t.team&&n.dist(e)<90));e&&(this.state=`capture`,this.capPort=e,this.capT=14)}if(this.state===`capture`){if(this.capT-=this.d.react,this.capPort.owner===t.team||this.capT<=0)this.state=`lane`;else{this.go(this.capPort.x+Hh(-8,8),this.capPort.z+Hh(-8,8));return}}this.laneBehaviour()}go(e,t){let n=this.h;(!this.dest||Math.hypot(this.dest.x-e,this.dest.z-t)>14||!n.path.length)&&(this.dest={x:e,z:t},n.setDestination(e,t))}laneBehaviour(){let e=this.h,t=this.G;t.time>330&&!this.groupLane&&(this.groupLane=t.weakestEnemyLane(e.team));let n=this.groupLane&&t.time>330?this.groupLane:e.lane,r=rf(e.team,n),i=null,a=-1/0;for(let r of t.creeps){if(!r.alive||r.team!==e.team||r.lane!==n)continue;let t=e.team===0?r.x:-r.x;t>a&&(a=t,i=r)}let o=e.hull.guns.range,s,c;if(i){let t=e.team===0?-1:1;s=i.x+t*o*.35+Hh(-10,10),c=i.z+Hh(-14,14)}else{let i=t.structures.filter(t=>t.alive&&t.team===e.team&&t.lane===n).sort((t,n)=>e.team===0?n.x-t.x:t.x-n.x)[0],a=i?{x:i.x+(e.team===0?40:-40),z:i.z*.9}:r[Math.floor(r.length/2)];s=a.x,c=a.z}let l=this.enemyTowerCovers(s,c);if(l&&!this.creepsTanking(l)){let t=s-l.x,n=c-l.z,r=Math.hypot(t,n)||1;s=l.x+t/r*(l.def.range+14),c=l.z+n/r*(l.def.range+14),(e.team===0?s>l.x:s<l.x)&&(s=l.x+(e.team===0?-1:1)*(l.def.range+14))}this.go(s,c);let u=t.structures.find(t=>t.alive&&t.team!==e.team&&!t.invulnerable&&e.dist(t)<o+t.radius+25);u&&this.creepsTanking(u)?e.attackOrder=u:e.attackOrder&&e.attackOrder.kind!==`hero`&&(e.attackOrder=null)}enemyTowerCovers(e,t){for(let n of this.G.structures)if(n.alive&&n.team!==this.h.team&&(n.x-e)**2+(n.z-t)**2<(n.def.range+8)**2)return n;return null}inEnemyTowerRange(){return!!this.enemyTowerCovers(this.h.x,this.h.z)}creepsTanking(e){let t=e||this.enemyTowerCovers(this.h.x,this.h.z);return t?t.target&&t.target.kind===`creep`?!0:this.G.creeps.some(e=>e.alive&&e.team===this.h.team&&e.dist(t)<t.def.range):!1}tryDefensive(e,t,n){let r=this.h,i=this.G;r.abilities.forEach((a,o)=>{zh(r,o)&&(a.type===`buff`?(a.speedMul&&(t||e.length)||a.healPct&&r.hp/r.maxHp<.55||a.shield&&(n>0||e.length))&&Bh(i,r,o,r.x,r.z):(a.type===`smoke`&&t&&e.length||a.type===`mines`&&t&&e.length||a.type===`pointdefense`&&this.threatCount()>3)&&Bh(i,r,o,r.x,r.z))})}threatCount(){let e=this.h,t=this.G,n=0;for(let r of t.drones.list)r.team!==e.team&&r.type!==`shield`&&(r.x-e.x)**2+(r.z-e.z)**2<3600&&n++;for(let r of t.combat.list)r.team!==e.team&&r.type===`homing`&&(r.x-e.x)**2+(r.z-e.z)**2<4900&&n++;return n}tryAbilities(e,t,n){let r=this.h,i=this.G;if(Math.random()>this.d.abilityRate)return;this.tryDefensive(e,!1,n);let a=i.creeps.filter(e=>e.alive&&e.team!==r.team&&r.dist(e)<200);for(let n=0;n<4;n++){if(!zh(r,n))continue;let o=r.abilities[n],s=o.range||0,c=t&&r.dist(t)<=s?t:e.find(e=>r.dist(e)<=s),l=(e,t)=>({x:e.x+(e.vx||0)*t*this.d.aim,z:e.z+(e.vz||0)*t*this.d.aim});switch(o.type){case`projectile`:case`beam`:{let e=c;if(!e&&a.length>=3&&Math.random()<.4&&(e=a.find(e=>r.dist(e)<s)),!e)break;let t=o.speed?r.dist(e)/o.speed:.05,u=l(e,t),d=(1-this.d.aim)*14;Bh(i,r,n,u.x+Hh(-d,d),u.z+Hh(-d,d));return}case`dash`:if(c&&r.dist(c)<s*.9&&r.hp/r.maxHp>.5){Bh(i,r,n,c.x,c.z);return}break;case`barrage`:case`swarm`:{let t=c?l(c,o.delay||1):null;if(!t){let e=Wh(a.filter(e=>r.dist(e)<s),30);e&&e.n>=(o.minLevel?4:3)&&(t=e)}if(!t&&(o.drone||o.type===`barrage`)){let e=i.structures.find(e=>e.alive&&e.team!==r.team&&!e.invulnerable&&r.dist(e)<s);e&&this.creepsTanking(e)&&(t={x:e.x,z:e.z})}if(o.drone===`fighter`&&!t&&e.length&&(t=e[0]),t){Bh(i,r,n,t.x,t.z);return}break}case`volley`:case`homing`:{let t=e.filter(e=>r.dist(e)<=s).length,o=a.filter(e=>r.dist(e)<=s).length;if(t>=1||o>=5){Bh(i,r,n,r.x,r.z);return}break}case`mines`:if(e.length&&e.some(e=>r.dist(e)<80)){Bh(i,r,n,r.x,r.z);return}}}}shop(){let e=this.h,t=this.G;if(e.canAgeUp()&&e.gold>=e.nextAgeCost()){let n=gf[e.age+1];t.ageUp(e,n[Math.min(this.branch,n.length-1)]);return}let n=e.gold+(e.spentAge||0)+(e.spentUpg||0),r=e.age===5?1/0:n*.25-(e.spentUpg||0);for(let n of this.upgOrder){let i=e.upgradeCost(n);if(!(!isFinite(i)||i>r||e.gold<i)){t.buyUpgrade(e,n);return}}}};function Wh(e,t){let n=null;for(let r of e){let i=0,a=0,o=0;for(let n of e)(r.x-n.x)**2+(r.z-n.z)**2<t*t&&(i++,a+=n.x,o+=n.z);(!n||i>n.n)&&(n={x:a/i,z:o/i,n:i})}return n}function Gh(e,t){let n=[...e];for(let e=n.length-1;e>0;e--){let r=(t*7+e*13)%(e+1);[n[e],n[r]]=[n[r],n[e]]}return n}var Kh=class{constructor(){this.h={}}on(e,t){(this.h[e]||=[]).push(t)}emit(e,t){(this.h[e]||[]).forEach(e=>e(t))}},qh=new B,Jh=(e,t)=>e+Math.random()*(t-e),Yh=[`top`,`top`,`mid`,`bot`,`bot`],Xh=new Ia(.9,1,72,1).rotateX(-Math.PI/2);function Zh(e,t){let n=new ni(Xh,new qa({uniforms:{uColor:{value:new V(e)},uA:{value:t?.55:.38},uTime:{value:0},...ad},vertexShader:`uniform float uTime; varying vec2 vUv; ${cd}
      void main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position, 1.0); vec3 n = vec3(0.0, 1.0, 0.0);
        vec3 d = gerstnerWave(wp.xz, uTime, n); wp.xyz += d; wp.y += 0.35;
        gl_Position = projectionMatrix * viewMatrix * wp; }`,fragmentShader:`uniform vec3 uColor; uniform float uA; varying vec2 vUv; void main(){ float e = 1.0 - abs(vUv.y - 0.5) * 2.0; gl_FragColor = vec4(uColor * 1.6 * e * uA, e * uA); }`,transparent:!0,depthWrite:!1,blending:2}));return n.renderOrder=3,n}var Qh=class{constructor(e,t){Object.assign(this,e),this.opts=t,this.diff=Tf[t.difficulty]||Tf.normal,this.events=new Kh,this.time=0,this.frame=0,this.over=!1,this.winner=-1,this.listener={x:0,z:0},this.obstacles=uf(),this.nav=new ff(this.obstacles),this.fountains=[lf(0),lf(1)],this.combat=new Sh(this),this.drones=new Nh(this),this.smokes=[],this.units=[],this.heroes=[],this.creeps=[],this.structures=[],this.ports=[],this.teams=pf.map(e=>({...e,kills:0,era:1,towersLost:0,ageAnnounced:{1:!0}})),this.structureScale=0,this.firstBlood=!1,this.nextWave=mf.firstWave,this.waveNo=0,this.combatHeat=0,this.stormAt=Jh(250,320),this.stormDur=55,this.storm=0;for(let e of of){let t=new Xm(this,e);this.structures.push(t),this.units.push(t)}for(let e of sf){let t=zm();t.root.position.set(e.x,0,e.z),this.scene.add(t.root),this.ports.push({...e,owner:-1,prog:0,rig:t,dist(e){return Math.hypot(e.x-this.x,e.z-this.z)}})}let n=[...wf].sort(()=>Math.random()-.5),r=0;this.bots=[];for(let e=0;e<2;e++)for(let i=0;i<5;i++){let a=e===t.playerTeam&&i===2&&!t.spectate,o=new Jm(this,e,a?t.playerName||`You`:n[r++%n.length],a,i);o.lane=Yh[i];let s=cf(e,i);o.x=s.x,o.z=s.z,o.yaw=s.yaw,this.heroes.push(o),this.units.push(o),a?(this.player=o,t.autopilot&&this.bots.push(new Uh(this,o,Tf.hard))):this.bots.push(new Uh(this,o,this.diff))}this.ocean.setIslands(this.obstacles),this.events.on(`levelUp`,e=>{e===this.player&&(this.audio.play(`levelUp`),this.ui.floatText(e.x,16,e.z,`LEVEL ${e.level}`,`#ffe28a`,20)),this.fx.ring(e.x,e.z,e.radius,e.radius*2.5,16769674,.7,.1)})}teamGlow(e){return pf[e].glow}findTarget(e,t,n){let r=null,i=1/0;for(let a of this.units){if(!a.alive||a.team===e.team||!a.targetable||(a.kind===`tower`||a.kind===`citadel`)&&a.invulnerable||a.kind===`hero`&&this.inEnemySmoke(a))continue;let o=e.dist2(a),s=t+a.radius;if(o>s*s)continue;let c=o;n===`tower`?c*=a.kind===`creep`?.3:1:n===`creep`?c*=a.kind===`creep`?.5:a.kind===`hero`?1:.8:n===`hero`&&(c*=a.kind===`hero`?.55:a.kind===`creep`?1:1.2),c<i&&(i=c,r=a)}return r}inEnemySmoke(e){for(let t of this.smokes)if(t.team===e.team&&(e.x-t.x)**2+(e.z-t.z)**2<t.r*t.r)return!0;return!1}isStructureProtected(e){if(e.tier===`outer`)return!1;let t=this.structures.filter(t=>t.team===e.team);return e.tier===`inner`?t.some(t=>t.alive&&t.tier===`outer`&&t.lane===e.lane):t.filter(e=>!e.alive&&e.tier===`inner`).length<2}weakestEnemyLane(e){let t=`mid`,n=1/0;for(let r of nf){let i=this.structures.filter(t=>t.team!==e&&t.lane===r&&t.alive).reduce((e,t)=>e+t.hp,0);i<n&&(n=i,t=r)}return t}ageUp(e,t){if(!e.canAgeUp()||!_f[t]||_f[t].age!==e.age+1)return!1;let n=e.nextAgeCost();if(e.gold<n)return!1;e.gold-=n,e.spentAge=(e.spentAge||0)+n,e.setHull(t),qm(e,.016,this.time),this.fx.ageUp(new B(e.x,0,e.z),this.teamGlow(e.team));let r=this.teams[e.team];if(e===this.player?(this.audio.stinger(`ageUp`),this.ui.announce(hf[e.age-1].name.toUpperCase(),_f[t].name,pf[e.team].css)):this.audio.play(`levelUp`,{x:e.x,z:e.z}),!r.ageAnnounced[e.age]&&(r.ageAnnounced[e.age]=!0,e!==this.player)){let n=this.player?e.team===this.player.team:e.team===0;this.ui.announce(`${r.short.toUpperCase()} ENTERS THE ${hf[e.age-1].name.toUpperCase()}`,`${e.name} commissions a ${_f[t].name}`,pf[e.team].css,`small`),this.audio.stinger(n?`ageUp`:`enemyAge`)}return this.ui.feed(`<b style="color:${pf[e.team].css}">${e.name}</b> advanced to the <b>${hf[e.age-1].name}</b>`),this.updateEra(e.team),!0}buyUpgrade(e,t){let n=e.upgradeCost(t);return!isFinite(n)||e.gold<n?!1:(e.gold-=n,e.spentUpg=(e.spentUpg||0)+n,e.upg[t]++,e.refreshStats(),e===this.player&&this.audio.play(`gold`),!0)}updateEra(e){let t=this.heroes.filter(t=>t.team===e).map(e=>e.age).sort((e,t)=>e-t)[2],n=this.teams[e];if(t!==n.era){n.era=t;for(let n of this.structures)n.team===e&&n.alive&&n.setEra(t)}}kill(e,t){if(!e.alive)return;e.alive=!1,e.hp=0,e.sinkT=0,e.sinkDir=Math.random()<.5?-1:1;let n=new B(e.x,2,e.z);if(e.kind===`hero`)this.heroDeath(e,t,n);else if(e.kind===`creep`){this.fx.explosion(n,e.heavy?1.2:.8),this.audio.play(`explosion`,{x:e.x,z:e.z,vol:.7});let r=t&&t.kind===`hero`?t:null;r&&(r.gold+=e.gold,r.creepKills++,r===this.player&&(this.ui.floatText(e.x,10,e.z,`+${e.gold}`,`#ffd24a`,15),this.audio.play(`gold`,{vol:.4}))),this.shareXp(e,e.xpVal,r)}else this.structureDeath(e,t,n)}shareXp(e,t,n){let r=this.heroes.filter(t=>t.alive&&t.team!==e.team&&t.dist(e)<Cf.xpShareRadius);if(n&&!r.includes(n)&&r.push(n),!r.length)return;let i=t*(r.length>1?1.2:1)/r.length,a=this.heroes.reduce((e,t)=>e+t.level,0)/this.heroes.length;for(let e of r)e.addXp(i*Math.min(1.6,Math.max(.8,1+.12*(a-e.level))))}heroDeath(e,t,n){this.fx.explosion(n,2.2),this.combat.after(.35,()=>this.fx.explosion(new B(e.x+Jh(-5,5),3,e.z+Jh(-5,5)),1.5)),this.combat.after(.8,()=>this.fx.explosion(new B(e.x+Jh(-6,6),2,e.z+Jh(-6,6)),1.2)),this.audio.play(`death`,{x:e.x,z:e.z,vol:1.2}),e.deaths++,e.prevStreak=e.streak,e.streak=0,e.respawn=mf.respawnBase+mf.respawnPerAge*e.age+e.level*.4,this.drones.popShields(e),e.shield=0,e.buffs=[],e.dash=null,e.pd=null;let r=[];for(let[n,i]of e.damagers){if(this.time-i>10)continue;let a=this.heroes.find(e=>e.id===n);a&&a!==t&&a.team!==e.team&&r.push(a)}e.damagers.clear();let i=e.prevStreak||0;e.deathStreak=(e.deathStreak||0)+1;let a=(Cf.heroGold+Cf.heroGoldPerAge*e.age)*Math.max(.45,1-.14*(e.deathStreak-1));if(a+=i>=3?90*i:0,t&&t.kind===`hero`){let n=this.teams[t.team].kills-this.teams[e.team].kills;a*=n>0?Math.max(.55,1-n*.035):Math.min(1.7,1-n*.05)}a=Math.round(a),i>=3&&this.ui.announce(`SHUTDOWN`,`${t&&t.name?t.name:`The sea`} ends ${e.name}'s rampage`,pf[1-e.team].css,`small`);let o=`the sea`;if(t&&t.kind===`hero`){t.kills++,t.streak++,t.deathStreak=0;let n=Math.max(0,t.streak-2)*Cf.streakGold;if(t.gold+=a+n,this.teams[t.team].kills++,o=`<b style="color:${pf[t.team].css}">${t.name}</b>`,t===this.player&&this.ui.floatText(e.x,14,e.z,`+${a+n}`,`#ffd24a`,22),!this.firstBlood)this.firstBlood=!0,this.ui.announce(`FIRST BLOOD`,`${t.name} sinks ${e.name}`,pf[t.team].css),this.audio.stinger(`firstBlood`);else{let e=this.time;t.multi=t.lastKillT&&e-t.lastKillT<12?(t.multi||1)+1:1,t.lastKillT=e;let n={2:`DOUBLE SINK`,3:`TRIPLE SINK`,4:`ARMADA BREAKER`,5:`ADMIRAL OF THE SEAS`};n[t.multi]?(this.ui.announce(n[t.multi],t.name,pf[t.team].css),this.audio.stinger(`firstBlood`)):t.streak===5&&this.ui.announce(`DOMINATING`,`${t.name} is on a rampage`,pf[t.team].css,`small`)}}else t&&(o=t.kind===`creep`?`a gunboat`:`a fortress`,this.teams[1-e.team].kills++);for(let e of r)e.assists++,e.gold+=Math.round(Cf.assistGold/Math.max(1,r.length)*1.5);this.shareXp(e,Cf.heroXp+Cf.heroXpPerLevel*e.level,t&&t.kind===`hero`?t:null),this.ui.feed(`${o} sank <b style="color:${pf[e.team].css}">${e.name}</b>${r.length?` <span class="dim">+${r.length}</span>`:``}`),e===this.player&&(this.ui.death(e.respawn,t),this.audio.stinger(`warning`))}structureDeath(e,t,n){let r=e.kind===`citadel`;for(let t=0;t<(r?10:5);t++)this.combat.after(t*.28,()=>this.fx.explosion(new B(e.x+Jh(-e.radius,e.radius),Jh(4,20),e.z+Jh(-e.radius,e.radius)),r?2.6:1.8,{water:!1}));this.combat.after(.1,()=>this.fx.megaExplosion(new B(e.x,6,e.z),r?60:28)),this.audio.play(`towerDown`,{x:e.x,z:e.z,vol:1.3});let i=1-e.team;this.teams[e.team].towersLost++;let a=e.def.gold||0;for(let e of this.heroes)e.team===i&&(e.gold+=a);if(t&&t.kind===`hero`&&(t.gold+=Math.round(a*.5)),r)this.endMatch(i,`citadel`);else{let t=!this.player||e.team!==this.player.team;this.ui.announce(t?`FORTRESS DESTROYED`:`OUR FORTRESS HAS FALLEN`,`${pf[i].name} destroys the ${e.lane} ${e.tier} tower`,pf[i].css,`small`),this.audio.stinger(`towerDown`),this.ui.feed(`<b style="color:${pf[i].css}">${pf[i].short}</b> destroyed the ${e.lane} ${e.tier} tower`)}}endMatch(e,t){if(this.over)return;this.over=!0,this.winner=e,this.slowmo=1.8;let n=this.player?e===this.player.team:e===0;this.combat.after(e<0?.5:2.2,()=>{this.audio.stinger(e<0?`defeat`:n?`victory`:`defeat`),this.ui.endScreen(this,e,t)})}spawnWave(){this.waveNo++;for(let e=0;e<2;e++){let t=this.teams[e].era;for(let n of nf){let r=rf(e,n),i=3+ +(this.waveNo>=8);for(let a=0;a<i+1;a++){let o=a===i;this.combat.after(a*.9,()=>{let i=new Ym(this,e,n,o,t,r);i.x=r[0].x+Jh(-6,6),i.z=r[0].z+Jh(-6,6),i.yaw=Math.atan2(r[1].x-r[0].x,r[1].z-r[0].z),this.creeps.push(i),this.units.push(i)})}}}}update(e){let t=Math.min(e,1/20);this.slowmo>0&&(this.slowmo-=e,t*=.35),this.hitstop>0&&(this.hitstop-=e,t*=.15),this.dt=t,this.frame++,this.over||(this.time+=t);let n=this.time;if(this.structureScale=xf.scalePerMin*(n/60),!this.over){n>=this.nextWave&&(this.spawnWave(),this.nextWave+=mf.waveInterval);for(let e of this.heroes){e.gold+=mf.passiveGold*t*(e.isPlayer?1:this.diff.goldMul);for(let n of this.ports)n.owner===e.team&&(e.gold+=Sf.goldPerSec*t)}n>=mf.duration&&this.timeUp();let e=n>this.stormAt&&n<this.stormAt+this.stormDur;e&&!this.storm&&(this.ui.announce(`A SQUALL ROLLS IN`,`Heavy seas · gunnery accuracy reduced`,`#9fb6d0`,`small`),this.audio.stinger(`warning`)),!e&&this.storm&&this.ui.feed(`<span class="dim">The squall passes.</span>`),this.storm=+!!e}for(let e of this.ports)this.updatePort(e,t);for(let e=this.smokes.length-1;e>=0;e--){let n=this.smokes[e];n.t+=t,n.t>n.dur&&this.smokes.splice(e,1)}if(!this.over)for(let e of this.bots)e.update(t);for(let e of this.heroes){if(!e.alive){e.respawn-=t,e.respawn<=0&&!this.over&&this.respawnHero(e);continue}e.update(t),Vh(this,e,t),e.untargetable=this.inEnemySmoke(e)?.1:e.untargetable}for(let e of this.creeps)e.update(t);for(let e of this.structures)e.update(t);Km(this.units.filter(e=>e.isShip&&e.alive),t),this.combat.update(t),this.drones.update(t);for(let e of this.units)this.syncVisual(e,t,n);for(let e=this.creeps.length-1;e>=0;e--){let t=this.creeps[e];!t.alive&&t.sinkT>4.5&&(t.removeVisual(),this.creeps.splice(e,1),this.units.splice(this.units.indexOf(t),1))}for(let e of this.teams);this.combatHeat=Math.max(0,this.combatHeat-t*.15)}timeUp(){let e=[0,1].map(e=>this.teams[1-e].towersLost*3+this.teams[e].kills+(this.structures.find(t=>t.team===1-e&&t.kind===`citadel`).maxHp-this.structures.find(t=>t.team===1-e&&t.kind===`citadel`).hp)/1e3);this.finalScore=e;let t=e[0]>e[1]?0:e[1]>e[0]?1:-1;this.ui.announce(`TIME`,t<0?`The seas are undecided`:`${pf[t].name} controls the seas`,t<0?`#ddd`:pf[t].css),this.endMatch(t,`time`)}respawnHero(e){let t=cf(e.team,e.slot);e.alive=!0,e.hp=e.maxHp,e.x=t.x,e.z=t.z,e.yaw=t.yaw,e.speed=0,e.sinkT=void 0,e.stun=0,e.slowT=0,e.path=[],e.moveX=null,e.attackOrder=null,e.rig.root.visible=!0,this.fx.ring(e.x,e.z,4,30,this.teamGlow(e.team),.8,.1),e===this.player&&this.ui.respawned()}updatePort(e,t){let n=[0,0];for(let t of this.heroes)t.alive&&t.dist(e)<Sf.radius+t.radius&&n[t.team]++;let r=n[0]&&!n[1]?0:n[1]&&!n[0]?1:-1;if(r>=0&&r!==e.owner){let n=r===0?-1:1;e.prog+=n*t/Sf.captureTime,Math.abs(e.prog)>=1?(e.prog=n,e.owner=r,e.rig.setOwner(r),this.fx.ring(e.x,e.z,10,Sf.radius*1.6,this.teamGlow(r),1,.08),this.audio.play(`capture`,{x:e.x,z:e.z}),this.ui.feed(`<b style="color:${pf[r].css}">${pf[r].short}</b> captured the ${e.id} trade port <span class="dim">(+${Sf.goldPerSec} gold/s each)</span>`)):e.owner>=0&&Math.sign(e.prog)!==Math.sign(e.owner===0?-1:1)&&Math.abs(e.prog)>.02&&(e.owner=-1,e.rig.setOwner(-1))}if(e.rig.update&&e.rig.update(t,this.time),this.frame%4==0){let t=e.owner>=0?pf[e.owner].glow:14540253;if(Math.abs(e.prog)>.01&&e.owner<0||r>=0&&r!==e.owner){let n=Math.random()*6.28,i=new V(r>=0?pf[r].glow:t);this.fx.p.add.emit({x:e.x+Math.cos(n)*Sf.radius,y:1,z:e.z+Math.sin(n)*Sf.radius,vy:8,life:.8,s0:1.4,s1:.2,r:i.r*2,g:i.g*2,b:i.b*2,a0:1,a1:0,kind:2})}}}syncVisual(e,t,n){let r=e.rig;if(!r)return;if(e.kind===`tower`||e.kind===`citadel`){e.alive||(e.sinkT+=t,r.root.position.y=-(Math.min(1,e.sinkT/4)**2)*(e.kind===`citadel`?30:22),r.root.rotation.z=Math.min(1,e.sinkT/4)*.15,Math.random()<.4&&this.fx.fire(new B(e.x+Jh(-6,6),4,e.z+Jh(-6,6)),1.6),e.sinkT>5&&r.root.visible&&(r.root.visible=!1)),r.update&&r.update(t,n);return}if(!e.alive){if(e.sinkT+=t,e.sinkT>5.5){r.root.visible=!1;return}Math.random()<.6&&this.fx.fire(new B(e.x+Jh(-3,3),2,e.z+Jh(-3,3)),e.kind===`hero`?1.5:.8),this.frame%3==0&&this.ocean.decals.add(e.x+Jh(-4,4),e.z+Jh(-4,4),r.beam*1.2,3,0,.8,1.5),this.frame%5==0&&this.ocean.decals.add(e.x,e.z,r.beam*1.5,12,2,.35,.4)}if(qm(e,t,n,e.kind===`hero`?.8:1),e.kind===`hero`&&(e.ring||(e.ring=Zh(e.isPlayer?16765562:pf[e.team].glow,e.isPlayer),this.scene.add(e.ring)),e.ring.visible=e.alive,e.ring.position.set(e.x,0,e.z),e.ring.material.uniforms.uTime.value=n,e.ring.scale.setScalar(r.length*.5+3+Math.sin(n*3)*(e.isPlayer?.3:0))),!e.alive)return;let i=Math.min(1,Math.abs(e.speed)/25);if(r.update&&r.update(t,n,i),r.turrets&&e.target&&e.target.alive){let n=Math.atan2(e.target.x-e.x,e.target.z-e.z)-e.yaw;for(let e of r.turrets){let r=e.pivot.rotation.y,i=Math.atan2(Math.sin(n-r),Math.cos(n-r));e.pivot.rotation.y=r+i*Math.min(1,t*4)}}if(e.wakeT=(e.wakeT||0)-t,e.wakeT<=0&&i>.1){e.wakeT=.09;let t=Math.sin(e.yaw),n=Math.cos(e.yaw),a=r.length*.5,o=e.kind===`hero`?.09+i*.13:.06+i*.07;if(this.ocean.decals.add(e.x-t*a,e.z-n*a,r.beam*(.7+i*.5),(e.kind===`hero`?2.6:1.6)+i*1.6,0,o,1.3+i*.6),this.ocean.decals.add(e.x+t*a*.9,e.z+n*a*.9,r.beam*.7,1.1,0,.35*i,1.2),e.kind===`hero`&&i>.5&&this.frame%2==0){let i=Math.random()<.5?1:-1;this.fx.p.alpha.emit({x:e.x+t*a*.85+n*i*r.beam*.4,y:.8,z:e.z+n*a*.85-t*i*r.beam*.4,vx:n*i*Jh(3,7)+t*4,vy:Jh(3,7),vz:-t*i*Jh(3,7)+n*4,life:.6,s0:1,s1:2.6,r:.95,g:.97,b:1,a0:.45,a1:0,kind:3,grav:18})}}if(e.stackT=(e.stackT||0)-t,e.stackT<=0){if(e.stackT=.09,r.stacks)for(let t of r.stacks)t.getWorldPosition(qh),this.fx.stackSmoke(qh,.22,e.kind===`hero`?1:.6);if((e.kind===`hero`?e.age:e.era)>=4&&r.engines)for(let t of r.engines)t.getWorldPosition(qh),this.fx.trailGlow(qh,e.team===0?[.5,1.2,3]:[3,.9,.4],2.6*(.4+i),.14)}let a=e.hp/e.maxHp;a<.45&&Math.random()<(.45-a)*1.6&&(qh.set(e.x+Jh(-1,1)*r.beam*.3,2+Jh(0,2),e.z+Jh(-1,1)*r.beam*.3),this.fx.fire(qh,e.kind===`hero`?1:.6))}},$h=e=>`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`,eg={projectile:$h(`<path d="M8 40 L34 14"/><path d="M26 12 L36 12 L36 22"/><circle cx="12" cy="36" r="3" fill="currentColor"/>`),chain:$h(`<circle cx="14" cy="24" r="6"/><circle cx="34" cy="24" r="6"/><path d="M20 24 H28"/><path d="M6 12 l6 4 M42 12 l-6 4" opacity=".6"/>`),grapeshot:$h(`<path d="M8 24 L40 10 M8 24 L42 24 M8 24 L40 38"/><circle cx="8" cy="24" r="3" fill="currentColor"/>`),barrage:$h(`<circle cx="24" cy="26" r="14"/><path d="M24 6 V16 M24 36 V44 M4 26 H14 M34 26 H44"/><circle cx="24" cy="26" r="3" fill="currentColor"/>`),volley:$h(`<path d="M6 36 Q18 6 30 20 M10 40 Q24 10 38 24 M14 44 Q30 16 44 30"/>`),speed:$h(`<path d="M10 12 L22 24 L10 36 M24 12 L36 24 L24 36"/>`),shield:$h(`<path d="M24 6 L40 12 V24 C40 34 32 40 24 43 C16 40 8 34 8 24 V12 Z"/>`),heal:$h(`<path d="M24 10 V38 M10 24 H38"/><circle cx="24" cy="24" r="18" opacity=".45"/>`),dash:$h(`<path d="M6 24 H34 M26 14 L38 24 L26 34"/><path d="M6 14 H16 M6 34 H16" opacity=".6"/>`),smoke:$h(`<path d="M12 34 C4 34 4 24 12 24 C12 14 26 12 28 20 C34 14 44 20 38 28 C44 32 40 38 34 36 Z"/>`),mines:$h(`<circle cx="24" cy="26" r="9"/><path d="M24 11 V17 M24 35 V41 M9 26 H15 M33 26 H39 M13 15 L17 19 M31 33 L35 37 M35 15 L31 19 M17 33 L13 37"/>`),homing:$h(`<path d="M8 40 C8 20 30 30 34 12"/><path d="M28 10 L36 10 L36 18"/><circle cx="38" cy="36" r="4"/>`),swarm:$h(`<circle cx="12" cy="14" r="3" fill="currentColor"/><circle cx="24" cy="10" r="3" fill="currentColor"/><circle cx="36" cy="16" r="3" fill="currentColor"/><circle cx="18" cy="26" r="3" fill="currentColor"/><circle cx="32" cy="28" r="3" fill="currentColor"/><circle cx="24" cy="38" r="3" fill="currentColor"/>`),fighter:$h(`<path d="M24 6 L28 20 L42 26 L28 28 L26 40 L24 36 L22 40 L20 28 L6 26 L20 20 Z"/>`),beam:$h(`<path d="M6 30 H42" stroke-width="5"/><path d="M6 30 H42" stroke="#fff" stroke-width="1.5"/><path d="M14 18 L20 24 L16 24 L22 30" opacity=".7"/>`),pointdefense:$h(`<circle cx="24" cy="24" r="16" stroke-dasharray="4 4"/><circle cx="24" cy="24" r="5"/><path d="M24 24 L38 12"/>`),emp:$h(`<path d="M26 4 L14 26 H24 L20 44 L34 20 H24 Z"/>`),ageup:$h(`<path d="M24 6 L36 22 H28 V40 H20 V22 H12 Z"/>`),plating:$h(`<path d="M24 6 L40 12 V24 C40 34 32 40 24 43 C16 40 8 34 8 24 V12 Z"/><path d="M16 22 H32 M16 30 H32" opacity=".6"/>`),gunnery:$h(`<circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="4" fill="currentColor"/><path d="M24 4 V12 M24 36 V44 M4 24 H12 M36 24 H44"/>`),engines:$h(`<circle cx="24" cy="24" r="8"/><path d="M24 6 V12 M24 36 V42 M6 24 H12 M36 24 H42 M11 11 L15 15 M33 33 L37 37 M37 11 L33 15 M15 33 L11 37"/>`),reload:$h(`<path d="M38 16 A16 16 0 1 0 40 28"/><path d="M40 8 V17 H31"/>`),repair:$h(`<path d="M30 8 A9 9 0 0 0 22 20 L8 34 L14 40 L28 26 A9 9 0 0 0 40 18 L34 22 L28 20 L26 14 Z"/>`)};function tg(e){return e.id===`chainshot`?eg.chain:e.id===`grapeshot`?eg.grapeshot:e.type===`buff`?e.speedMul?eg.speed:e.healPct?eg.heal:eg.shield:e.type===`swarm`?e.drone===`micro`?eg.swarm:eg.fighter:e.model===`emp`?eg.emp:eg[e.type]||eg.projectile}var ng=new B,rg=[`Q`,`W`,`E`,`R`],ig=e=>`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,`0`)}`,ag=e=>String(e).replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),og=class{constructor(e,t){this.root=e,this.cv=t,this.ctx=t.getContext(`2d`),this.floats=[],this.handlers={},this.hoverAbility=-1,this.annQueue=[],this.annBusy=!1,this.resize(),window.addEventListener(`resize`,()=>this.resize())}on(e,t){this.handlers[e]=t}resize(){let e=Math.min(window.devicePixelRatio||1,2);this.dpr=e,this.cv.width=window.innerWidth*e,this.cv.height=window.innerHeight*e,this.cv.style.width=window.innerWidth+`px`,this.cv.style.height=window.innerHeight+`px`}mount(e){this.G=e;let t=e.player;this.root.innerHTML=`
      <div id="topbar" class="panel ornate">
        <div class="side blue"><div class="kills" id="k0">0</div><div class="era"><span>${pf[0].name}</span><b id="e0">Age of Sail</b></div></div>
        <div class="clock"><div class="t" id="clock">10:00</div><div class="sun"><i id="sun"></i></div></div>
        <div class="side red"><div class="kills" id="k1">0</div><div class="era"><span>${pf[1].name}</span><b id="e1">Age of Sail</b></div></div>
      </div>
      <div id="feed" class="passthru"></div>
      <div id="announce" class="passthru"></div>
      <div id="minimap" class="panel ornate"><canvas id="mm" width="600" height="368"></canvas></div>
      ${t?`<div id="command">
        <div id="portrait" class="panel ornate">
          <div class="lvl" id="lvl">1</div>
          <div class="name" id="shipname"></div>
          <div class="sub" id="shipsub"></div>
          <div class="bar" id="hpbar"><div class="lag" id="hplag"></div><div class="fill" id="hpfill"></div><div class="shield" id="shfill"></div><div class="txt" id="hptxt"></div></div>
          <div class="bar xp"><div class="fill" id="xpfill"></div></div>
        </div>
        <div id="abilities" class="panel ornate"></div>
        <div id="goldbox" class="panel ornate">
          <div class="gold" id="gold">0</div>
          <button id="ageup"></button>
        </div>
      </div>
      <div id="shop" class="panel ornate"><h3>ARMORY</h3><div id="upgs"></div></div>`:``}
      <div id="tip" class="panel hidden"></div>
      <div id="scoreboard" class="panel ornate hidden"></div>
      <div id="modalRoot"></div>
      <div id="deathRoot"></div>
      <div id="hintRoot" class="passthru"></div>`,this.elCache={},this.valCache={},this.$=e=>{let t=this.elCache[e];return t&&t.isConnected?t:this.elCache[e]=this.root.querySelector(`#`+e)},this.txt=(e,t)=>{let n=`t`+e;if(this.valCache[n]!==t){this.valCache[n]=t;let r=this.$(e);r&&(r.textContent=t)}},this.sty=(e,t,n)=>{let r=e+t;if(this.valCache[r]!==n){this.valCache[r]=n;let i=this.$(e);i&&(i.style[t]=n)}},this.mm=this.$(`mm`),this.mmCtx=this.mm.getContext(`2d`),this.buildMinimapBase(),this.mm.addEventListener(`mousedown`,e=>{let t=this.mm.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2*Yd.x-Yd.x,r=(e.clientY-t.top)/t.height*2*Yd.z-Yd.z;e.button===2&&this.handlers.minimapMove?this.handlers.minimapMove(n,r):this.handlers.minimapLook&&this.handlers.minimapLook(n,r),e.preventDefault()}),this.mm.addEventListener(`contextmenu`,e=>e.preventDefault()),t&&(this.buildAbilities(),this.buildShop(),this.$(`ageup`).addEventListener(`click`,()=>this.handlers.ageUp&&this.handlers.ageUp()),this.lastHull=t.hullId),this.lastHpF=1}buildAbilities(){let e=this.G.player,t=this.$(`abilities`);t.innerHTML=e.abilities.map((e,t)=>`
      <div class="ab" data-i="${t}">${tg(e)}<div class="cd"></div><div class="cdt"></div><div class="key">${rg[t]}</div>${e.minLevel?`<div class="lock hidden">LV ${e.minLevel}</div>`:``}</div>`).join(``),t.querySelectorAll(`.ab`).forEach(t=>{let n=+t.dataset.i;t.addEventListener(`mouseenter`,()=>{this.hoverAbility=n,this.showTip(t,this.abilityTip(e.abilities[n]))}),t.addEventListener(`mouseleave`,()=>{this.hoverAbility=-1,this.hideTip()}),t.addEventListener(`click`,()=>this.handlers.castButton&&this.handlers.castButton(n))}),this.abEls=[...t.querySelectorAll(`.ab`)]}abilityTip(e){let t=[];return e.dmg&&t.push(`${e.dmg}${e.count>1?` × ${e.count}`:``} dmg`),e.range&&t.push(`range ${e.range}`),t.push(`${e.cd}s cooldown`),`<h4>${ag(e.name)}</h4><div class="meta">${t.join(` · `)}${e.minLevel?` · requires level ${e.minLevel}`:``}</div>${ag(e.desc)}`}buildShop(){let e=this.$(`upgs`);e.innerHTML=yf.map((e,t)=>`
      <div class="upg" data-id="${e.id}">${eg[e.id]}<div><div class="n">${e.name} <span class="k">Ctrl+${t+1}</span></div><div class="pips">${`<i></i>`.repeat(e.max)}</div></div><div class="c"></div></div>`).join(``),e.querySelectorAll(`.upg`).forEach(e=>{let t=yf.find(t=>t.id===e.dataset.id);e.addEventListener(`click`,()=>this.handlers.buy&&this.handlers.buy(t.id)),e.addEventListener(`mouseenter`,()=>this.showTip(e,`<h4>${t.name}</h4>${t.desc}`)),e.addEventListener(`mouseleave`,()=>this.hideTip())}),this.upgEls=[...e.querySelectorAll(`.upg`)]}showTip(e,t){let n=this.$(`tip`);n.innerHTML=t,n.classList.remove(`hidden`);let r=e.getBoundingClientRect(),i=n.getBoundingClientRect();n.style.left=Math.max(8,Math.min(window.innerWidth-i.width-8,r.left+r.width/2-i.width/2))+`px`,n.style.top=r.top-i.height-10+`px`}hideTip(){this.$(`tip`).classList.add(`hidden`)}openAgeChoice(e,t){let n=hf[this.G.player.age],r=this.$(`modalRoot`);r.innerHTML=`<div class="modal"><h1>${n.name.toUpperCase()}</h1><div class="choice">${e.map(e=>{let t=_f[e];return`<div class="card panel ornate" data-id="${e}"><div class="role">${t.role}</div><h2>${t.name}</h2><p>${t.desc}</p>
        <div class="stats"><span>Hull <b>${t.hp}</b></span><span>Speed <b>${t.speed}</b></span><span>Range <b>${t.guns.range}</b></span></div>
        <ul>${t.abilities.map((e,t)=>`<li><b>${rg[t]}</b>${vf[e].name}</li>`).join(``)}</ul></div>`}).join(``)}</div></div>`,r.querySelectorAll(`.card`).forEach(e=>e.addEventListener(`click`,()=>{r.innerHTML=``,t(e.dataset.id)})),r.querySelector(`.modal`).addEventListener(`mousedown`,e=>{e.target.classList.contains(`modal`)&&(r.innerHTML=``)})}get modalOpen(){return!!this.$(`modalRoot`)?.innerHTML}closeModal(){this.$(`modalRoot`).innerHTML=``}announce(e,t=``,n=`#e8c47a`,r=``){this.annQueue.push({title:e,sub:t,color:n,size:r}),this.annQueue.length>3&&this.annQueue.splice(1,1),this.annBusy||this.nextAnnounce()}nextAnnounce(){let e=this.annQueue.shift(),t=this.$(`announce`);if(!e||!t){this.annBusy=!1;return}this.annBusy=!0,t.innerHTML=`<div class="a ${e.size}" style="--c:${e.color}"><h1>${ag(e.title)}</h1><div class="bar"></div><p>${ag(e.sub)}</p></div>`;let n=t.firstChild;setTimeout(()=>n.classList.add(`out`),e.size?2e3:2600),setTimeout(()=>this.nextAnnounce(),e.size?2500:3100)}feed(e){let t=this.$(`feed`);if(!t)return;let n=document.createElement(`div`);for(n.className=`item`,n.innerHTML=e,t.prepend(n);t.children.length>6;)t.lastChild.remove();setTimeout(()=>{n.style.opacity=`0`,setTimeout(()=>n.remove(),700)},9e3)}hint(e,t=5e3){let n=this.$(`hintRoot`);n.innerHTML=`<div class="hint panel">${e}</div>`,clearTimeout(this.hintT),this.hintT=setTimeout(()=>n.innerHTML=``,t)}floatText(e,t,n,r,i=`#fff`,a=14){this.floats.length>80&&this.floats.shift(),this.floats.push({x:e,y:t,z:n,text:r,color:i,size:a,t:0,life:1.1,dx:(Math.random()-.5)*30})}damageNumber(e,t,n){let r=e.id+(n?`i`:`o`);this.dmgAcc||=new Map;let i=this.dmgAcc.get(r);(!i||i.t>.35)&&(i={t:0,sum:0,target:e,incoming:n,float:null},this.dmgAcc.set(r,i)),i.sum+=t,(!i.float||i.float.t>.35)&&(i.float={x:e.x,y:(e.rig?.height||8)+4,z:e.z,text:``,color:n?`#ff6a5a`:`#ffffff`,size:15,t:0,life:1,dx:(Math.random()-.5)*30},this.floats.push(i.float),this.floats.length>60&&this.floats.shift()),i.float.text=String(Math.round(i.sum)),i.float.size=Math.min(26,13+Math.sqrt(i.sum)*.35)}death(e,t){let n=this.$(`deathRoot`);n.innerHTML=`<div id="death"><h1>SUNK</h1><p>${t&&t.name?`by ${ag(t.name)} · `:``}Recommissioning in <span id="rsp">${Math.ceil(e)}</span>s</p></div>`}respawned(){this.$(`deathRoot`).innerHTML=``}scoreboardHTML(e){let t=t=>e.heroes.filter(e=>e.team===t).sort((e,t)=>t.kills-e.kills).map(e=>`
      <tr class="${e.isPlayer?`me`:``}"><td style="color:${pf[t].css}">${ag(e.name)}${e.isPlayer?` (you)`:``}</td><td>${_f[e.hullId].name}</td><td>${e.level}</td>
      <td>${e.kills} / ${e.deaths} / ${e.assists}</td><td>${e.creepKills}</td><td>${Math.round(e.dmgDealt/100)/10}k</td><td>${Math.floor(e.gold)}</td></tr>`).join(``),n=`<tr><th>Captain</th><th>Vessel</th><th>Lv</th><th>K / D / A</th><th>Sunk</th><th>Damage</th><th>Gold</th></tr>`;return`<table><tr><td colspan="7" class="team" style="color:${pf[0].css}">${pf[0].name} · ${e.teams[0].kills} kills</td></tr>${n}${t(0)}
      <tr><td colspan="7" class="team" style="color:${pf[1].css}">${pf[1].name} · ${e.teams[1].kills} kills</td></tr>${n}${t(1)}</table>`}toggleScoreboard(e){let t=this.$(`scoreboard`);t&&(t.classList.toggle(`hidden`,!e),e&&(t.innerHTML=this.scoreboardHTML(this.G)))}endScreen(e,t,n){let r=t===(e.player?e.player.team:0),i=t<0?`STALEMATE`:r?`VICTORY`:`DEFEAT`,a=t<0?`The seas remain contested`:n===`citadel`?`${pf[t].name} razed the enemy citadel`:`${pf[t].name} controls the seas at dusk`,o=this.$(`modalRoot`);o.innerHTML=`<div id="end"><h1 class="${r?`win`:`lose`}">${i}</h1><div class="sub">${a}</div>
      <div class="panel ornate">${this.scoreboardHTML(e)}</div>
      <button class="btn-primary" id="again">SAIL AGAIN</button><button class="btn-ghost" id="tomenu">Main menu</button></div>`,o.querySelector(`#again`).onclick=()=>this.handlers.again&&this.handlers.again(),o.querySelector(`#tomenu`).onclick=()=>this.handlers.menu&&this.handlers.menu()}buildMinimapBase(){let e=this.mm.width,t=this.mm.height,n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=r.createLinearGradient(0,0,0,t);i.addColorStop(0,`#0d2a3a`),i.addColorStop(1,`#0a1f2c`),r.fillStyle=i,r.fillRect(0,0,e,t);let a=e/(Yd.x*2),o=t/(Yd.z*2);this.mmS={sx:a,sz:o},r.strokeStyle=`rgba(160,200,220,.12)`,r.lineWidth=10;for(let e of Object.values(tf))r.beginPath(),e.forEach((e,t)=>{let n=(e.x+Yd.x)*a,i=(e.z+Yd.z)*o;t?r.lineTo(n,i):r.moveTo(n,i)}),r.stroke();for(let e of Qd)r.beginPath(),r.arc((e.x+Yd.x)*a,(e.z+Yd.z)*o,e.r*a,0,Math.PI*2),r.fillStyle=e.kind===`jungle`?`#2d3d24`:`#3a3833`,r.fill(),r.strokeStyle=`rgba(230,220,180,.35)`,r.lineWidth=1.5,r.stroke();this.mmBase=n}drawMinimap(e,t,n){let r=this.mmCtx;this.mm.width,this.mm.height;let{sx:i,sz:a}=this.mmS,o=e=>(e+Yd.x)*i,s=e=>(e+Yd.z)*a;r.drawImage(this.mmBase,0,0);for(let t of e.ports)r.save(),r.translate(o(t.x),s(t.z)),r.rotate(Math.PI/4),r.fillStyle=t.owner>=0?pf[t.owner].css:`#ddd`,r.fillRect(-6,-6,12,12),r.restore();for(let t of e.structures){if(!t.alive)continue;let e=t.kind===`citadel`?16:10;r.fillStyle=pf[t.team].css,r.strokeStyle=`#000`,r.lineWidth=2,r.fillRect(o(t.x)-e/2,s(t.z)-e/2,e,e),r.strokeRect(o(t.x)-e/2,s(t.z)-e/2,e,e)}for(let t of e.creeps)t.alive&&(r.fillStyle=t.team===0?`#8fd0ff`:`#ff9a8a`,r.fillRect(o(t.x)-2,s(t.z)-2,4,4));for(let t of e.heroes)t.alive&&(r.beginPath(),r.arc(o(t.x),s(t.z),t.isPlayer?8:6.5,0,Math.PI*2),r.fillStyle=pf[t.team].css,r.fill(),r.lineWidth=t.isPlayer?3:1.5,r.strokeStyle=t.isPlayer?`#ffe28a`:`#000`,r.stroke());r.fillStyle=`rgba(255,255,255,.5)`;for(let t=0;t<e.drones.list.length;t+=3){let n=e.drones.list[t];r.fillRect(o(n.x),s(n.z),1.5,1.5)}n&&(r.strokeStyle=`rgba(255,255,255,.7)`,r.lineWidth=1.5,r.strokeRect(o(t.x-n.w/2),s(t.z-n.h/2),n.w*i,n.h*a))}update(e,t,n,r,i){let a=e.player;this.txt(`k0`,String(e.teams[0].kills)),this.txt(`k1`,String(e.teams[1].kills)),this.txt(`e0`,hf[e.teams[0].era-1].name),this.txt(`e1`,hf[e.teams[1].era-1].name),this.txt(`clock`,ig(Math.max(0,mf.duration-e.time))),this.sty(`sun`,`left`,`${Math.min(100,e.time/mf.duration*100).toFixed(1)}%`),e.frame%4==0&&this.drawMinimap(e,r,i),a&&this.updatePlayerPanel(e,a);let o=this.$(`scoreboard`);o&&!o.classList.contains(`hidden`)&&e.frame%20==0&&(o.innerHTML=this.scoreboardHTML(e));let s=this.$(`rsp`);s&&a&&(s.textContent=Math.max(0,Math.ceil(a.respawn))),this.drawOverlay(e,t,n)}updatePlayerPanel(e,t){t.hullId!==this.lastHull&&(this.buildAbilities(),this.lastHull=t.hullId);let n=_f[t.hullId];this.txt(`shipname`,`${t.name} · ${n.name}`),this.txt(`shipsub`,`${hf[t.age-1].name} · ${n.role}`),this.txt(`lvl`,String(t.level));let r=Math.max(0,t.hp/t.maxHp);if(this.sty(`hpfill`,`transform`,`scaleX(${r.toFixed(3)})`),this.sty(`hplag`,`transform`,`scaleX(${r.toFixed(3)})`),this.sty(`hpfill`,`background`,r<.3?`linear-gradient(180deg,#ff8a6a,#c33a2a)`:``),this.sty(`shfill`,`transform`,`scaleX(${Math.min(1,t.shield/t.maxHp).toFixed(3)})`),this.txt(`hptxt`,`${Math.ceil(Math.max(0,t.hp))} / ${t.maxHp}`),this.sty(`xpfill`,`transform`,`scaleX(${(t.level>=mf.maxLevel?1:t.xp/t.xpToNext()).toFixed(3)})`),this.txt(`gold`,String(Math.floor(t.gold))),t.abilities.forEach((e,n)=>{let r=this.abEls[n];if(!r)return;let i=e.cd*t.cdMul,a=t.cds[n];r.querySelector(`.cd`).style.setProperty(`--p`,`${a/i*100}%`),r.querySelector(`.cdt`).textContent=a>0?a<1?a.toFixed(1):Math.ceil(a):``;let o=r.querySelector(`.lock`);o&&o.classList.toggle(`hidden`,t.level>=e.minLevel),r.classList.toggle(`ready`,a<=0),r.classList.toggle(`silenced`,t.silence>0||t.stun>0),r._wasCd&&a<=0&&(r.classList.remove(`flash`),r.offsetWidth,r.classList.add(`flash`)),r._wasCd=a>0}),e.frame%6!=0)return;let i=this.$(`ageup`);if(t.canAgeUp()){let e=hf[t.age],n=t.gold>=e.cost;i.innerHTML=`<b>Advance to the ${e.name}</b>${Math.floor(t.gold)} / ${e.cost} gold · [T]`,i.disabled=!n,i.classList.toggle(`can`,n)}else i.innerHTML=`<b>Age of Swarms reached</b>Pinnacle of naval technology`,i.disabled=!0,i.classList.remove(`can`);this.upgEls.forEach(e=>{let n=e.dataset.id,r=t.upg[n],i=t.upgradeCost(n);e.querySelectorAll(`.pips i`).forEach((e,t)=>e.classList.toggle(`on`,t<r)),e.querySelector(`.c`).textContent=isFinite(i)?i:`MAX`,e.classList.toggle(`no`,isFinite(i)&&t.gold<i),e.classList.toggle(`max`,!isFinite(i))})}drawOverlay(e,t,n){let r=this.ctx,i=this.dpr,a=this.cv.width,o=this.cv.height;r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,a,o),r.setTransform(i,0,0,i,0,0);let s=a/i,c=o/i,l=(e,n,r)=>(ng.set(e,n,r).project(t),ng.z>1?null:{x:(ng.x*.5+.5)*s,y:(-ng.y*.5+.5)*c}),u=e.player;if(u&&u.alive){let t=0,n=`rgba(232,196,122,.5)`;if(this.hoverAbility>=0){let e=u.abilities[this.hoverAbility];t=e.range||e.radius||0}else this.showRange&&(t=u.hull.guns.range,n=`rgba(255,255,255,.28)`);t&&this.drawRing(r,l,u.x,u.z,t,n),e.aim&&this.drawRing(r,l,e.aim.x,e.aim.z,e.aim.r,`rgba(255,140,90,.7)`)}r.font=`600 12px Rajdhani, sans-serif`,r.textAlign=`center`;for(let t of e.units){if(!t.alive)continue;let e=t.rig&&t.rig.height||10,n=l(t.x,e+(t.kind===`citadel`?18:t.kind===`tower`?8:5),t.z);if(!n||n.x<-50||n.y<-50||n.x>s+50||n.y>c+50)continue;let i=t.kind===`hero`,a=i?74:t.kind===`creep`?34:96,o=i?8:t.kind===`creep`?4:8,d=n.x-a/2,f=n.y,p=Math.max(0,t.hp/t.maxHp);if(r.fillStyle=`rgba(0,0,0,.65)`,r.fillRect(d-1,f-1,a+2,o+2),r.fillStyle=t===u?`#6ff08a`:pf[t.team].css,r.fillRect(d,f,a*p,o),t.shield>0&&(r.fillStyle=`rgba(210,240,255,.9)`,r.fillRect(d,f,Math.min(a,a*(t.shield/t.maxHp)),o*.45)),i){r.fillStyle=`rgba(0,0,0,.55)`;for(let e=500;e<t.maxHp;e+=500)r.fillRect(d+a*e/t.maxHp,f,1,o);r.fillStyle=t===u?`#ffe28a`:`#fff`,r.strokeStyle=`rgba(0,0,0,.8)`,r.lineWidth=3;let e=`${t.level}  ${t.name}`;r.strokeText(e,n.x,f-5),r.fillText(e,n.x,f-5),t.stun>0&&(r.fillStyle=`#9cf`,r.fillText(`STUNNED`,n.x,f+o+12))}else(t.kind===`tower`||t.kind===`citadel`)&&t.invulnerable&&(r.fillStyle=`rgba(200,220,255,.7)`,r.fillText(`⛨`,n.x+a/2+8,f+8))}for(let t of e.ports){let e=l(t.x,12,t.z);e&&(r.beginPath(),r.lineWidth=4,r.strokeStyle=`rgba(0,0,0,.5)`,r.arc(e.x,e.y,14,0,Math.PI*2),r.stroke(),Math.abs(t.prog)>.01&&(r.beginPath(),r.strokeStyle=t.prog<0?pf[0].css:pf[1].css,r.arc(e.x,e.y,14,-Math.PI/2,-Math.PI/2+Math.abs(t.prog)*Math.PI*2),r.stroke()),r.fillStyle=`#e8c47a`,r.font=`700 11px Rajdhani, sans-serif`,r.fillText(`PORT`,e.x,e.y+4))}if(this.dmgAcc)for(let[e,t]of this.dmgAcc)t.t+=n,t.t>1.2&&this.dmgAcc.delete(e);for(let e=this.floats.length-1;e>=0;e--){let t=this.floats[e];if(t.t+=n,t.t>t.life){this.floats.splice(e,1);continue}let i=l(t.x,t.y,t.z);if(!i)continue;let a=t.t/t.life,o=a<.12?1+(.12-a)*5:1;r.globalAlpha=a>.6?1-(a-.6)/.4:1,r.font=`700 ${t.size*o}px Rajdhani, sans-serif`,r.lineWidth=4,r.strokeStyle=`rgba(0,0,0,.85)`;let s=i.x+t.dx*a,c=i.y-40*a;r.strokeText(t.text,s,c),r.fillStyle=t.color,r.fillText(t.text,s,c),r.globalAlpha=1}}drawRing(e,t,n,r,i,a){e.beginPath();for(let a=0;a<=48;a++){let o=a/48*Math.PI*2,s=t(n+Math.cos(o)*i,.5,r+Math.sin(o)*i);s&&(a?e.lineTo(s.x,s.y):e.moveTo(s.x,s.y))}e.strokeStyle=a,e.lineWidth=2,e.setLineDash([8,6]),e.stroke(),e.setLineDash([])}},sg=(e,t,n)=>e+(t-e)*n,cg=class{constructor(e){this.cam=e,this.focus=new B(0,0,0),this.goal=new B,this.dist=165,this.distGoal=165,this.locked=!0,this.trauma=0,this.t=0,this.intro=0,this.orbit=null,this.keys={},this.mouse={x:.5,y:.5,inside:!1},this.yaw=0}addTrauma(e,t,n){let r=Math.hypot(t-this.focus.x,n-this.focus.z),i=Math.max(0,1-r/260);this.trauma=Math.min(1,this.trauma+e*i*i)}zoom(e){this.distGoal=At.clamp(this.distGoal*(1+e*.0012),85,290)}startIntro(e,t){this.intro=4.2,this.introFrom=e.clone(),this.introTo=t.clone()}get view(){return{w:this.dist*1.45*this.cam.aspect*.95,h:this.dist*1.1}}update(e,t){this.t+=e;let n=this.cam;if(this.orbit){let t=this.orbit;if(t.a+=e*.035,t.follow&&t.follow()){let n=t.follow();t.cx=sg(t.cx,n.x,e*.3),t.cz=sg(t.cz,n.z,e*.3)}let r=t.cx+Math.cos(t.a)*t.r,i=t.cz+Math.sin(t.a)*t.r;n.position.set(r,t.h+Math.sin(this.t*.2)*6,i),n.lookAt(t.cx,4,t.cz),this.focus.set(t.cx,0,t.cz);return}if(this.intro>0){this.intro-=e;let t=1-Math.max(0,this.intro)/4.2,r=t<.5?4*t*t*t:1-(-2*t+2)**3/2;this.focus.lerpVectors(this.introFrom,this.introTo,r);let i=sg(520,this.dist,r),a=At.degToRad(sg(30,56,r)),o=sg(-.9,0,r);n.position.set(this.focus.x+Math.sin(o)*Math.cos(a)*i,Math.sin(a)*i,this.focus.z+Math.cos(o)*Math.cos(a)*i),n.lookAt(this.focus);return}let r=340*e*(this.dist/160),i=0,a=0;if(this.keys.ArrowLeft&&--i,this.keys.ArrowRight&&(i+=1),this.keys.ArrowUp&&--a,this.keys.ArrowDown&&(a+=1),this.mouse.inside&&!this.locked){let e=.012;this.mouse.x<e&&--i,this.mouse.x>.988&&(i+=1),this.mouse.y<e&&--a,this.mouse.y>.988&&(a+=1)}i||a?(this.locked=!1,this.goal.x+=i*r,this.goal.z+=a*r):this.locked&&t&&this.goal.set(t.x+(t.vx||0)*.35,0,t.z+(t.vz||0)*.35-6),this.goal.x=At.clamp(this.goal.x,-Yd.x-60,Yd.x+60),this.goal.z=At.clamp(this.goal.z,-Yd.z-40,Yd.z+60);let o=1-Math.exp(-e*(this.locked?5:10));this.focus.lerp(this.goal,o),this.dist=sg(this.dist,this.distGoal,1-Math.exp(-e*8));let s=(this.dist-85)/205,c=At.degToRad(sg(44,62,s)),l=this.focus.x,u=Math.sin(c)*this.dist,d=this.focus.z+Math.cos(c)*this.dist;this.trauma=Math.max(0,this.trauma-e*1.6);let f=this.trauma*this.trauma,p=(e,t)=>Math.sin(this.t*e+t)*.6+Math.sin(this.t*e*2.3+t*3.1)*.4;l+=p(37,0)*f*4,u+=p(41,1)*f*3,d+=p(33,2)*f*4,n.position.set(l,u,d),n.lookAt(this.focus.x+p(29,4)*f*1.5,0,this.focus.z+p(31,5)*f*1.5),n.rotateZ(p(23,6)*f*.03)}snapTo(e,t){this.goal.set(e,0,t),this.focus.set(e,0,t)}},lg=e=>440*2**((e-69)/12),Q=(e=0,t=1)=>e+Math.random()*(t-e),ug=e=>e[Math.random()*e.length|0],dg=(e,t=0,n=1)=>e<t?t:e>n?n:e,fg=(e,t,n)=>{let r=dg((n-e)/(t-e));return r*r*(3-2*r)};function pg(e,t){if(!t)return e;if(Array.isArray(t))for(let n of t)n&&e.connect(n);else e.connect(t);return e}function mg(e,t,n,r,i,a=0){let o=Math.max(r,11e-5);n=Math.max(n,5e-4),e.setValueAtTime(0,t),e.linearRampToValueAtTime(o,t+n),a>0&&e.setValueAtTime(o,t+n+a),e.exponentialRampToValueAtTime(1e-4,t+n+a+i),e.setValueAtTime(0,t+n+a+i+.005)}var hg=new WeakMap;function gg(e){let t=hg.get(e);return t||(t={white:yg(e,2,`white`),pink:yg(e,2,`pink`),brown:yg(e,2.5,`brown`),crackle:bg(e,2),irSea:xg(e,2.6,{predelay:.018,bright:.55,dark:.07,early:[.021,.034,.047,.066,.089]}),irHall:xg(e,3.9,{predelay:.028,bright:.45,dark:.05,early:[.031,.052,.074,.101,.133]}),ks:new Map},hg.set(e,t),t)}function _g(e,t,n){for(let r=0;r<n;r++){let i=r/n;e[r]=e[r]*i+e[t+r]*(1-i)}}function vg(e,t=.95){let n=0;for(let t=0;t<e.length;t++){let r=Math.abs(e[t]);r>n&&(n=r)}if(n>0){let r=t/n;for(let t=0;t<e.length;t++)e[t]*=r}}function yg(e,t,n){let r=e.sampleRate,i=Math.floor(r*t),a=2048,o=new Float32Array(i+a),s=0,c=0,l=0,u=0,d=0,f=0,p=0,m=0;for(let e=0;e<i+a;e++){let t=Math.random()*2-1;n===`white`?o[e]=t:n===`pink`?(s=.99886*s+t*.0555179,c=.99332*c+t*.0750759,l=.969*l+t*.153852,u=.8665*u+t*.3104856,d=.55*d+t*.5329522,f=-.7616*f-t*.016898,o[e]=(s+c+l+u+d+f+p+t*.5362)*.11,p=t*.115926):(m=(m+.02*t)/1.02,o[e]=m*3.5)}if(n===`brown`){let e=0;for(let t=0;t<o.length;t++)e+=o[t];e/=o.length;for(let t=0;t<o.length;t++)o[t]-=e}_g(o,i,a);let h=e.createBuffer(1,i,r),g=h.getChannelData(0);return g.set(o.subarray(0,i)),vg(g),h}function bg(e,t){let n=e.sampleRate,r=Math.floor(n*t),i=e.createBuffer(1,r,n),a=i.getChannelData(0),o=900/n;for(let e=0;e<r;e++)if(Math.random()<o){let t=(.25+.75*Math.random()**3)*(Math.random()<.5?-1:1),n=8+(Math.random()*70|0),i=n/3;for(let o=0;o<n;o++){let n=(e+o)%r;a[n]+=t*Math.exp(-o/i)*(Math.random()*2-1)}}return vg(a),i}function xg(e,t,{predelay:n=.02,bright:r=.5,dark:i=.06,early:a=[]}={}){let o=e.sampleRate,s=Math.floor(o*t),c=e.createBuffer(2,s,o),l=Math.floor(n*o);for(let e=0;e<2;e++){let u=c.getChannelData(e),d=0;for(let e=l;e<s;e++){let n=(e-l)/o,a=Math.exp(-6.9*n/t),s=i+(r-i)*Math.exp(-n/(t*.25));d+=s*(Math.random()*2-1-d);let c=Math.min(1,n/.012);u[e]=d*a*c*(.8+.4*s)}a.forEach((t,r)=>{let i=Math.floor((t+n*.5+e*.0037*(r+1))*o);i<s&&(u[i]+=(.6-r*.09)*(Math.random()<.5?-1:1))})}return c}function Sg(e,t,n){let r=Math.round(n*4)/4,i=t.ks.get(r);if(i)return i;let a=32e3,o=lg(r),s=dg(3.2-(r-50)*.045,1.4,3.4),c=Math.floor(a*s);i=e.createBuffer(1,c,a);let l=i.getChannelData(0),u=.5,d=a/o-u,f=Math.floor(d-.15),p=d-f,m=(1-p)/(1+p),h=new Float32Array(f),g=0,_=dg(.75-(r-60)*.01,.35,.85);for(let e=0;e<f;e++)g+=_*(Math.random()*2-1-g),h[e]=g;let v=Math.max(1,Math.floor(f*.14)),y=Float32Array.from(h);for(let e=0;e<f;e++)h[e]=y[e]-.8*y[(e+v)%f];let b=0;for(let e=0;e<f;e++)b+=h[e];b/=f;for(let e=0;e<f;e++)h[e]-=b;let x=10**(-3/(dg(4.2-(r-50)*.07,.9,4.5)*o)),S=0,C=0,w=0,T=0;for(let e=0;e<c;e++){let t=h[S],n=x*(.5*t+u*C);C=t;let r=m*n+w-m*T;w=n,T=r,h[S]=r,S=S+1===f?0:S+1,l[e]=t}let E=8e3;for(let e=0;e<E;e++)l[c-1-e]*=e/E;return vg(l,.9),t.ks.set(r,i),i}var Cg=class{constructor(e,t,n=!1){this.ctx=e,this.res=t,this.srcs=n?[]:null}_reg(e){return this.srcs&&this.srcs.push(e),e}gain(e=1,t){let n=this.ctx.createGain();return n.gain.value=e,pg(n,t)}filter(e,t,n=.707,r){let i=this.ctx.createBiquadFilter();return i.type=e,i.frequency.value=t,i.Q.value=n,pg(i,r)}pan(e,t){if(this.ctx.createStereoPanner){let n=this.ctx.createStereoPanner();return n.pan.value=dg(e,-1,1),pg(n,t)}return this.gain(1,t)}osc(e,t,n,r,i){let a=this.ctx.createOscillator();return a.type=e,a.frequency.setValueAtTime(t,n),pg(a,i),a.start(n),a.stop(n+r),this._reg(a)}noise(e,t,n,r=1,i){let a=this.ctx.createBufferSource(),o=this.res[e];return a.buffer=o,a.loop=!0,a.playbackRate.value=r,pg(a,i),a.start(t,Math.random()*o.duration*.9),a.stop(t+n),this._reg(a)}buffer(e,t,n=1,r){let i=this.ctx.createBufferSource();return i.buffer=e,i.playbackRate.setValueAtTime(n,t),pg(i,r),i.start(t),i.stop(t+e.duration/Math.max(.25,n)+.05),this._reg(i)}lfo(e,t,n,r,i,a=`sine`){let o=this.gain(t,n);return{o:this.osc(a,e,r,i,o),g:o}}tone(e,{type:t=`sine`,f:n=440,f1:r,sweep:i,a=.002,hold:o=0,d:s=.3,peak:c=.5,dest:l,detune:u=0}){let d=this.gain(0,l||this.out),f=this.osc(t,n,e,a+o+s+.03,d);return u&&(f.detune.value=u),r&&r!==n&&f.frequency.exponentialRampToValueAtTime(r,e+(i??a+o+s)),mg(d.gain,e,a,c,s,o),{o:f,g:d}}burst(e,{kind:t=`white`,rate:n=1,type:r=`lowpass`,f:i=1e3,f1:a,sweep:o,Q:s=.707,a:c=.002,hold:l=0,d:u=.3,peak:d=.5,dest:f,type2:p,f2:m=1e3,Q2:h=.707}){let g=this.gain(0,f||this.out),_=g;p&&(_=this.filter(p,m,h,_));let v=this.filter(r,i,s,_);v.frequency.setValueAtTime(i,e),a&&a!==i&&v.frequency.exponentialRampToValueAtTime(a,e+(o??c+l+u));let y=this.noise(t,e,c+l+u+.03,n,v);return mg(g.gain,e,c,d,u,l),{src:y,flt:v,g}}clang(e,{f:t,ratios:n,decays:r,amps:i,peak:a=.2,dest:o,a:s=.001,type:c=`sine`}){for(let l=0;l<n.length;l++)this.tone(e,{type:c,f:t*n[l]*Q(.995,1.005),a:s,d:r[l%r.length],peak:a*(i?i[l]:1/(1+l)),dest:o})}blip(e,t,n,r,i=.04,a=1.8){this.tone(e,{f:t,f1:t*a,sweep:i,a:.002,d:i,peak:n,dest:r})}},wg={cannon:{cap:8,pri:3,rev:.22,echo:.05,range:1,jp:.07,jv:.18,lvl:.87},cannonHeavy:{cap:6,pri:5,rev:.25,echo:.12,range:1.15,jp:.05,jv:.15,lvl:.74},shellWhistle:{cap:4,pri:2,rev:.15,echo:0,range:.8,jp:.08,jv:.2,lvl:1.07},flak:{cap:8,pri:2,rev:.2,echo:.03,range:.9,jp:.1,jv:.2,lvl:1.27},laser:{cap:8,pri:2,rev:.18,echo:0,range:.9,jp:.05,jv:.15,lvl:1.26},pulse:{cap:8,pri:2,rev:.18,echo:0,range:.9,jp:.06,jv:.15,lvl:1.14},rail:{cap:3,pri:7,rev:.28,echo:.14,range:1.15,jp:.03,jv:.1,lvl:.88},torpedoLaunch:{cap:4,pri:3,rev:.15,echo:0,range:.9,jp:.06,jv:.15,lvl:.94},torpedoRun:{cap:4,pri:1,rev:.1,echo:0,range:.7,jp:.08,jv:.2,lvl:1.78},missile:{cap:6,pri:3,rev:.22,echo:.05,range:1,jp:.06,jv:.15,lvl:1.66},missileRipple:{cap:2,pri:5,rev:.22,echo:.06,range:1.05,jp:.04,jv:.1,lvl:3.02},hypersonic:{cap:2,pri:8,rev:.25,echo:.15,range:1.25,jp:.03,jv:.08,lvl:1.06},explosion:{cap:6,pri:4,rev:.25,echo:.07,range:1,jp:.08,jv:.18,lvl:.75},explosionBig:{cap:3,pri:7,rev:.3,echo:.15,range:1.2,jp:.05,jv:.1,lvl:.65},splash:{cap:8,pri:1,rev:.15,echo:0,range:.8,jp:.12,jv:.25,lvl:1.62},hit:{cap:8,pri:2,rev:.18,echo:0,range:.85,jp:.1,jv:.2,lvl:.92},droneLaunch:{cap:4,pri:2,rev:.15,echo:0,range:.85,jp:.08,jv:.15,lvl:2.66},dronePop:{cap:10,pri:1,rev:.15,echo:0,range:.8,jp:.15,jv:.25,lvl:1.51},emp:{cap:2,pri:6,rev:.3,echo:.08,range:1.05,jp:.04,jv:.1,lvl:.93},shield:{cap:3,pri:5,rev:.3,echo:0,range:.9,jp:.03,jv:.1,lvl:1.74},shieldHit:{cap:6,pri:2,rev:.22,echo:0,range:.85,jp:.1,jv:.2,lvl:1.84},heal:{cap:3,pri:4,rev:.3,echo:0,range:.85,jp:.04,jv:.1,lvl:3.31},ram:{cap:3,pri:5,rev:.22,echo:.05,range:1,jp:.06,jv:.12,lvl:.69},smoke:{cap:3,pri:3,rev:.2,echo:0,range:.9,jp:.06,jv:.15,lvl:2.72},mineDrop:{cap:4,pri:2,rev:.15,echo:0,range:.8,jp:.08,jv:.15,lvl:1.64},bombWhistle:{cap:4,pri:3,rev:.15,echo:0,range:.9,jp:.06,jv:.15,lvl:1.43},engineBoost:{cap:3,pri:3,rev:.2,echo:.04,range:.9,jp:.04,jv:.12,lvl:1.27},levelUp:{cap:2,pri:9,rev:.3,echo:0,range:2,jp:0,jv:.05,lvl:3.47},gold:{cap:4,pri:6,rev:.2,echo:0,range:2,jp:.02,jv:.1,lvl:3.51},uiClick:{cap:3,pri:10,rev:.05,echo:0,range:2,jp:.02,jv:.05,lvl:4.73},uiHover:{cap:2,pri:10,rev:.05,echo:0,range:2,jp:.02,jv:.05,lvl:6.84},uiError:{cap:2,pri:10,rev:.05,echo:0,range:2,jp:0,jv:.05,lvl:2},capture:{cap:2,pri:8,rev:.3,echo:.12,range:1.3,jp:.02,jv:.08,lvl:2.57},death:{cap:4,pri:8,rev:.28,echo:.12,range:1.2,jp:.05,jv:.1,lvl:.84},towerDown:{cap:2,pri:8,rev:.3,echo:.15,range:1.3,jp:.04,jv:.08,lvl:.8},sailFlap:{cap:4,pri:1,rev:.12,echo:0,range:.7,jp:.1,jv:.25,lvl:4.68}};function Tg(e,t,n,r){let i=Math.sqrt(n);e.burst(t,{kind:`white`,type:`highpass`,f:1400*r,a:8e-4,d:.03+.03*n,peak:.5}),e.burst(t,{kind:`pink`,type:`lowpass`,f:3600*r,f1:380/n*r,sweep:.3*n+.15,Q:.8,a:.002,d:.5+.6*n,peak:.85,dest:[e.out,e.echo]}),e.tone(t,{f:118/i*r,f1:38/i*r,sweep:.2+.4*n,a:.003,d:.35+.6*n,peak:.75+.2*n}),e.burst(t+.015,{kind:`crackle`,type:`bandpass`,f:2300*r,Q:.6,a:.01,d:.5+.9*n,peak:.3}),e.burst(t+.04,{kind:`brown`,type:`lowpass`,f:650*r,f1:170*r,sweep:1.5*n,a:.06,d:.9+1.2*n,peak:.28+.14*n,dest:[e.out,e.wet]})}function Eg(e,t,n,r,i,a,o){for(let s=0;s<n;s++)e.blip(t+Math.random()*r,Q(i,a)*e.p,o*Q(.5,1),e.out,Q(.025,.05),Q(1.4,2.2))}function Dg(e,t,{fc:n,fc1:r,ratio:i,index:a,index1:o=1,sweep:s,a:c=.001,d:l=.25,peak:u=.3,dest:d}){let f=e.osc(`sine`,n,t,c+l+.03),p=e.osc(`sine`,n*i,t,c+l+.03),m=e.gain(a,f.frequency);p.connect(m),r&&(f.frequency.exponentialRampToValueAtTime(r,t+s),p.frequency.exponentialRampToValueAtTime(r*i,t+s)),m.gain.setValueAtTime(a,t),m.gain.exponentialRampToValueAtTime(Math.max(1,o),t+(s??l));let h=e.gain(0,d||e.out);f.connect(h);let g=h.gain;g.setValueAtTime(0,t),g.linearRampToValueAtTime(u,t+c),g.exponentialRampToValueAtTime(1e-4,t+c+l)}function Og(e,t,n,r,i,a){let o=e.gain(0,e.out),s=e.osc(`sine`,n,t,i+.05,o);s.frequency.exponentialRampToValueAtTime(r,t+i),e.lfo(Q(8,12),n*.006,s.frequency,t,i+.05),e.osc(`triangle`,n*1.003,t,i+.05,e.gain(.25,o)).frequency.exponentialRampToValueAtTime(r*1.003,t+i),o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(a*.25,t+i*.5),o.gain.exponentialRampToValueAtTime(a,t+i*.93),o.gain.linearRampToValueAtTime(0,t+i);let c=e.gain(0,e.out),l=e.filter(`bandpass`,n*1.9,9,c);l.frequency.setValueAtTime(n*1.9,t),l.frequency.exponentialRampToValueAtTime(r*1.9,t+i),e.noise(`white`,t,i+.05,1,l),c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(a*.7,t+i*.93),c.gain.linearRampToValueAtTime(0,t+i)}var kg={cannon(e){let{t,p:n}=e;return e.burst(t,{kind:`white`,type:`highpass`,f:1900*n,a:8e-4,d:.045,peak:.55}),e.burst(t,{kind:`pink`,type:`bandpass`,f:190*n,Q:1.1,a:.002,d:.22,peak:.6}),e.burst(t,{kind:`pink`,type:`lowpass`,f:2600*n,f1:260*n,sweep:.35,Q:.9,a:.002,d:.65,peak:.85,dest:[e.out,e.echo]}),e.tone(t,{f:96*n,f1:38*n,sweep:.25,a:.002,d:.45,peak:.85}),e.burst(t+.03,{kind:`brown`,type:`lowpass`,f:520*n,f1:170*n,sweep:1.2,a:.05,d:1.4,peak:.3,dest:[e.out,e.wet]}),1.9},cannonHeavy(e){let{t,p:n}=e;return e.burst(t,{kind:`white`,type:`highpass`,f:1200*n,a:6e-4,d:.08,peak:.6}),e.burst(t,{kind:`white`,type:`bandpass`,f:3400*n,Q:.8,a:6e-4,d:.025,peak:.45}),e.burst(t,{kind:`pink`,type:`lowpass`,f:3e3*n,f1:170*n,sweep:.9,Q:.9,a:.002,d:1.2,peak:1,dest:[e.out,e.echo]}),e.tone(t,{f:72*n,f1:26*n,sweep:.6,a:.003,d:1.1,peak:1}),e.tone(t+.018,{type:`triangle`,f:46*n,f1:24*n,sweep:.8,a:.004,d:1,peak:.45}),e.burst(t+.05,{kind:`brown`,type:`lowpass`,f:360*n,f1:110*n,sweep:3,a:.1,d:3.2,peak:.45,dest:[e.out,e.wet]}),[.35,.9,1.65].forEach((r,i)=>{e.burst(t+r*Q(.9,1.1),{kind:`brown`,type:`lowpass`,f:420/(i+1)*n,Q:1.2,a:.08,d:1+i*.3,peak:.26/(i+1),dest:[e.out,e.wet]})}),4.6},shellWhistle(e){let t=Q(.95,1.2);return Og(e,e.t,Q(2300,2700)*e.p,Q(800,1e3)*e.p,t,.22),t+.1},flak(e){let{t,p:n}=e;return e.burst(t,{kind:`white`,type:`highpass`,f:2600*n,a:5e-4,d:.03,peak:.55}),e.burst(t,{kind:`pink`,type:`bandpass`,f:900*n,Q:1.2,a:.001,d:.12,peak:.8}),e.tone(t,{f:170*n,f1:60*n,sweep:.08,a:.001,d:.14,peak:.5}),e.burst(t+.02,{kind:`crackle`,type:`bandpass`,f:3e3*n,Q:.7,a:.005,d:.25,peak:.3}),e.burst(t+.01,{kind:`brown`,type:`lowpass`,f:700*n,a:.01,d:.45,peak:.25,dest:[e.out,e.wet]}),.8},laser(e){let{t,p:n}=e,r=e.gain(0,e.out),i=e.filter(`lowpass`,5200*n,5,r);i.frequency.setValueAtTime(5200*n,t),i.frequency.exponentialRampToValueAtTime(900*n,t+.2);let a=e.osc(`sawtooth`,1650*n,t,.3,i),o=e.osc(`square`,1658*n,t,.3,e.gain(.5,i));return a.frequency.exponentialRampToValueAtTime(260*n,t+.17),o.frequency.exponentialRampToValueAtTime(258*n,t+.17),r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(.22,t+.003),r.gain.exponentialRampToValueAtTime(1e-4,t+.24),e.tone(t,{f:3200*n,f1:1800*n,sweep:.08,a:.001,d:.1,peak:.1}),e.burst(t,{kind:`white`,type:`highpass`,f:4e3,a:5e-4,d:.012,peak:.18}),.35},pulse(e){let{t,p:n}=e;return Dg(e,t,{fc:540*n,fc1:170*n,ratio:2.7,index:900,index1:5,sweep:.16,d:.24,peak:.3}),e.burst(t,{kind:`crackle`,type:`bandpass`,f:2600*n,Q:.8,a:.001,d:.12,peak:.35}),e.tone(t,{f:150*n,f1:60*n,sweep:.1,a:.001,d:.12,peak:.3}),e.burst(t,{kind:`white`,type:`bandpass`,f:5e3*n,Q:1,a:5e-4,d:.02,peak:.25}),.4},rail(e){let{t,p:n}=e;e.burst(t,{kind:`white`,type:`highpass`,f:2500*n,a:4e-4,d:.06,peak:.8}),e.burst(t,{kind:`white`,type:`bandpass`,f:6500*n,Q:.7,a:4e-4,d:.12,peak:.35}),e.burst(t+.005,{kind:`white`,type:`bandpass`,f:7e3*n,f1:650*n,sweep:.5,Q:1.5,a:.002,d:.6,peak:.45}),e.tone(t,{f:66*n,f1:24*n,sweep:.5,a:.002,d:1,peak:1}),e.burst(t,{kind:`pink`,type:`lowpass`,f:2200*n,f1:150*n,sweep:.8,a:.002,d:1,peak:.5,dest:[e.out,e.echo]});let r=e.gain(0,e.out),i=e.gain(.6,r);e.lfo(31,.4,i.gain,t,1.8,`square`);let a=e.filter(`bandpass`,2600*n,6,i);return a.frequency.setValueAtTime(2600*n,t),a.frequency.exponentialRampToValueAtTime(900*n,t+1.4),[1200,1213].forEach(r=>{e.osc(`sawtooth`,r*n,t,1.8,a).frequency.exponentialRampToValueAtTime(680*n,t+1.5)}),Ag(r.gain,t,.006,.14,1.5),e.burst(t+.01,{kind:`crackle`,type:`highpass`,f:3e3,a:.002,d:.5,peak:.3}),2.6},torpedoLaunch(e){let{t,p:n}=e;e.tone(t,{f:135*n,f1:50*n,sweep:.12,a:.002,d:.2,peak:.7}),e.burst(t,{kind:`white`,type:`bandpass`,f:2300*n,f1:700*n,sweep:.45,Q:1.2,a:.01,d:.5,peak:.35});let r=t+Q(.22,.3);return e.burst(r,{kind:`pink`,type:`bandpass`,f:700*n,Q:.8,a:.004,d:.4,peak:.4}),e.burst(r,{kind:`white`,type:`highpass`,f:3e3,a:.01,d:.3,peak:.12}),Eg(e,r+.08,4,.5,400,900,.07),1.1},torpedoRun(e){let{t,p:n}=e,r=e.gain(0,e.out),i=e.gain(.5,r);e.lfo(Q(14,19),.45,i.gain,t,1.5);let a=e.filter(`lowpass`,600*n,1,i);return e.noise(`brown`,t,1.5,1,a),e.tone(t,{type:`triangle`,f:112*n,a:.3,hold:.5,d:.6,peak:.07,dest:i}),e.burst(t,{kind:`pink`,type:`bandpass`,f:1500*n,Q:1,a:.3,hold:.4,d:.6,peak:.06}),r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(.4,t+.3),r.gain.setValueAtTime(.4,t+.8),r.gain.exponentialRampToValueAtTime(1e-4,t+1.4),1.5},missile(e){let{t,p:n}=e;e.burst(t,{kind:`pink`,type:`bandpass`,f:1200*n,Q:1,a:.001,d:.07,peak:.55}),e.tone(t,{f:125*n,f1:55*n,sweep:.1,a:.002,d:.16,peak:.4});let r=e.burst(t,{kind:`white`,type:`bandpass`,f:900*n,Q:.9,a:.04,hold:.3,d:1.1,peak:.42});return r.flt.frequency.exponentialRampToValueAtTime(2600*n,t+.25),r.flt.frequency.exponentialRampToValueAtTime(1300*n,t+1.4),r.src.playbackRate.setValueAtTime(1.1,t),r.src.playbackRate.linearRampToValueAtTime(.75,t+1.4),e.burst(t,{kind:`brown`,type:`lowpass`,f:320*n,a:.05,d:1.2,peak:.35,dest:[e.out,e.echo]}),e.burst(t+.03,{kind:`crackle`,type:`highpass`,f:1500,a:.02,d:.9,peak:.16}),1.8},missileRipple(e){let{t,p:n}=e,r=t;for(let t=0;t<8;t++)e.burst(r,{kind:`pink`,type:`bandpass`,f:1400*n*Q(.9,1.1),Q:1,a:.001,d:.05,peak:.35}),e.burst(r,{kind:`white`,type:`bandpass`,f:1900*n*Q(.9,1.1),f1:1100*n,sweep:.5,Q:.9,a:.02,d:.45,peak:.2}),r+=Q(.09,.14);return e.burst(t,{kind:`brown`,type:`lowpass`,f:290*n,a:.1,hold:r-t,d:1,peak:.35,dest:[e.out,e.echo]}),r-t+1.3},hypersonic(e){let{t,p:n}=e,r=1.32,i=e.gain(0,e.out),a=e.filter(`bandpass`,500*n,2.5,i);a.frequency.setValueAtTime(500*n,t),a.frequency.exponentialRampToValueAtTime(4800*n,t+r),e.noise(`white`,t,1.37,1,a),i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.5,t+r-.02),i.gain.linearRampToValueAtTime(0,t+r+.02);let o=e.gain(0,e.out);e.osc(`sine`,320*n,t,1.37,o).frequency.exponentialRampToValueAtTime(2600*n,t+r),o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.09,t+r-.02),o.gain.linearRampToValueAtTime(0,t+r+.02);let s=t+r;for(let t of[0,.085])e.burst(s+t,{kind:`white`,type:`lowpass`,f:3500,a:4e-4,d:.06,peak:.85,dest:[e.out,e.echo]}),e.tone(s+t,{f:58*n,f1:24*n,sweep:.5,a:.002,d:.9,peak:.8});return e.burst(s,{kind:`brown`,type:`lowpass`,f:420*n,f1:100*n,sweep:2.4,a:.02,d:2.5,peak:.5,dest:[e.out,e.wet]}),4.0200000000000005},explosion(e){return Tg(e,e.t,.8,e.p),2.3},explosionBig(e){let{t,p:n}=e;Tg(e,t,1.6,n),e.tone(t,{f:90*n,f1:34*n,sweep:.4,a:.002,d:.5,peak:.45}),e.burst(t+.06,{kind:`brown`,type:`lowpass`,f:900*n,f1:240*n,sweep:2.5,a:.1,d:2.8,peak:.45,dest:[e.out,e.wet]});for(let r=0;r<3;r++){let r=t+Q(.35,1.3);e.burst(r,{kind:`pink`,type:`bandpass`,f:Q(600,1100)*n,Q:1,a:.001,d:.16,peak:Q(.15,.28)})}return 5},splash(e){let{t,p:n}=e;e.burst(t,{kind:`pink`,type:`bandpass`,f:520*n,Q:1,a:.003,d:.15,peak:.5}),e.tone(t,{f:230*n,f1:90*n,sweep:.12,a:.002,d:.15,peak:.22}),e.burst(t+.01,{kind:`white`,type:`highpass`,f:2500,a:.02,d:.7,peak:.28,type2:`lowpass`,f2:9e3}),e.burst(t+.02,{kind:`pink`,type:`lowpass`,f:1300*n,f1:400*n,sweep:.9,a:.05,d:.9,peak:.25});for(let r=0;r<5;r++)e.blip(t+Q(.15,.8),Q(900,2800)*n,Q(.02,.05),e.out,.025,1.5);return 1.3},hit(e){let{t,p:n}=e;return e.clang(t,{f:Q(330,490)*n,ratios:[1,2.32,4.25,6.63,9.38],decays:[.6,.45,.3,.2,.12],amps:[1,.72,.5,.32,.2],peak:.24}),e.burst(t,{kind:`white`,type:`bandpass`,f:3500*n,Q:1,a:5e-4,d:.025,peak:.5}),e.tone(t,{f:150*n,f1:80*n,sweep:.05,a:.001,d:.12,peak:.4}),.9},droneLaunch(e){let{t,p:n}=e;e.burst(t,{kind:`white`,type:`bandpass`,f:400*n,f1:2200*n,sweep:.35,Q:1.5,a:.08,d:.4,peak:.28});let r=e.gain(0,e.out),i=e.filter(`lowpass`,1800*n,3,r);return e.osc(`sawtooth`,220*n,t,.7,i).frequency.exponentialRampToValueAtTime(880*n,t+.4),Ag(r.gain,t,.03,.09,.45,.15),e.burst(t,{kind:`white`,type:`highpass`,f:5e3,a:5e-4,d:.012,peak:.2}),.8},dronePop(e){let{t,p:n}=e;return e.burst(t,{kind:`white`,type:`bandpass`,f:1800*n,Q:1.4,a:5e-4,d:.06,peak:.6}),e.tone(t,{f:240*n,f1:90*n,sweep:.05,a:.001,d:.1,peak:.35}),e.burst(t+.005,{kind:`crackle`,type:`highpass`,f:2500,a:.002,d:.15,peak:.25}),.35},emp(e){let{t,p:n}=e;e.burst(t,{kind:`crackle`,type:`highpass`,f:1500,a:.002,d:.6,peak:.55}),e.burst(t,{kind:`white`,type:`bandpass`,f:3e3*n,Q:1,a:.001,d:.15,peak:.45}),Dg(e,t,{fc:900*n,fc1:300*n,ratio:2.66,index:1500,index1:10,sweep:.3,d:.4,peak:.26});let r=e.gain(0,e.out),i=e.filter(`lowpass`,3e3*n,5,r);return i.frequency.setValueAtTime(3e3*n,t),i.frequency.exponentialRampToValueAtTime(200*n,t+1.3),e.osc(`sawtooth`,2200*n,t,1.5,i).frequency.exponentialRampToValueAtTime(35*n,t+1.3),Ag(r.gain,t,.005,.22,1.4),e.tone(t,{f:80*n,f1:28*n,sweep:.5,a:.003,d:.8,peak:.7}),e.tone(t+.05,{f:700*n,f1:40*n,sweep:1.1,a:.01,d:1.1,peak:.12,dest:[e.out,e.wet]}),2},shield(e){let{t,p:n}=e;[293.7,440,659.3].forEach((r,i)=>{e.tone(t+i*.04,{type:`triangle`,f:r*.5*n,f1:r*n,sweep:.5,a:.25,hold:.3,d:.7,peak:.075})}),e.burst(t,{kind:`white`,type:`bandpass`,f:2e3*n,f1:6e3*n,sweep:.8,Q:3,a:.2,d:.7,peak:.12});let r=e.gain(0,e.out),i=e.gain(.75,r);return e.lfo(8,.25,i.gain,t,1.3),e.osc(`sine`,110*n,t,1.3,i),Ag(r.gain,t,.1,.14,.8,.3),[1174.7,1568,1760,2349.3].forEach((r,i)=>e.tone(t+.3+i*.07,{f:r*n,a:.002,d:.4,peak:.045,dest:[e.out,e.wet]})),1.5},shieldHit(e){let{t,p:n}=e,r=e.gain(0,e.out),i=e.gain(.4,r);return e.lfo(47,.6,i.gain,t,.42),e.osc(`sine`,240*n,t,.42,i).frequency.exponentialRampToValueAtTime(180*n,t+.3),Ag(r.gain,t,.001,.32,.35),e.tone(t,{f:1400*n,a:.001,d:.4,peak:.07,dest:[e.out,e.wet]}),e.tone(t,{f:2100*n,a:.001,d:.3,peak:.045}),e.burst(t,{kind:`white`,type:`bandpass`,f:2500*n,Q:1.2,a:5e-4,d:.06,peak:.35}),.6},heal(e){let{t,p:n}=e;return[0,.16,.34].forEach(r=>{e.clang(t+r,{f:Q(900,1300)*n,ratios:[1,2.7,5.1],decays:[.15,.1,.06],peak:.1}),e.burst(t+r,{kind:`white`,type:`bandpass`,f:2500,Q:1.5,a:5e-4,d:.02,peak:.2})}),[587.3,659.3,880,1174.7].forEach((r,i)=>{let a=t+.1+i*.1;e.tone(a,{f:r*n,a:.002,d:1,peak:.065,dest:[e.out,e.wet]}),e.tone(a,{f:r*2.76*n,a:.002,d:.3,peak:.02})}),e.burst(t+.1,{kind:`white`,type:`bandpass`,f:6e3,Q:2,a:.3,d:.8,peak:.04}),1.8},ram(e){let{t,p:n}=e;e.tone(t,{f:85*n,f1:32*n,sweep:.3,a:.002,d:.5,peak:1}),e.burst(t,{kind:`white`,type:`bandpass`,f:1500*n,Q:.8,a:5e-4,d:.08,peak:.55}),e.burst(t+.01,{kind:`crackle`,type:`lowpass`,f:2500,a:.005,d:.7,peak:.55}),e.burst(t+.03,{kind:`crackle`,type:`bandpass`,f:600,Q:1,a:.005,d:.5,peak:.45}),e.clang(t,{f:170*n,ratios:[1,2.4,3.9,5.6],decays:[.9,.6,.4,.3],peak:.13});let r=e.gain(0,e.out),i=e.filter(`lowpass`,500,4,r);return e.osc(`sawtooth`,95*n,t+.05,1.4,i).frequency.exponentialRampToValueAtTime(55*n,t+1.3),Ag(r.gain,t+.05,.1,.12,1.1),1.8},smoke(e){let{t,p:n}=e;return e.burst(t,{kind:`white`,type:`bandpass`,f:1200*n,Q:1.5,a:5e-4,d:.04,peak:.3}),e.burst(t,{kind:`white`,type:`bandpass`,f:3200*n,f1:1600*n,sweep:1.5,Q:.7,a:.15,hold:.6,d:1.2,peak:.25}),e.burst(t,{kind:`pink`,type:`lowpass`,f:600*n,a:.02,d:.5,peak:.3}),2.2},mineDrop(e){let{t,p:n}=e;e.clang(t,{f:520*n,ratios:[1,2.9,5.2],decays:[.2,.12,.08],peak:.12}),e.tone(t,{f:180*n,f1:90*n,sweep:.08,a:.001,d:.1,peak:.35});let r=t+Q(.18,.24);return e.burst(r,{kind:`pink`,type:`bandpass`,f:600*n,Q:1,a:.003,d:.15,peak:.3}),e.tone(r,{f:350*n,f1:140*n,sweep:.08,a:.002,d:.1,peak:.25}),Eg(e,r+.05,3,.4,500,1100,.06),.9},bombWhistle(e){let t=Q(1.3,1.5);return Og(e,e.t,Q(1800,2e3)*e.p,Q(450,520)*e.p,t,.22),t+.1},engineBoost(e){let{t,p:n}=e;if(e.o.variant===`steam`)return[440,554.4,659.3].forEach(r=>{let{o:i}=e.tone(t,{f:r*.97*n,f1:r*n,sweep:.12,a:.08,hold:.7,d:.4,peak:.075});e.lfo(5.5,r*.003,i.frequency,t,1.3),e.burst(t,{kind:`white`,type:`bandpass`,f:r*2*n,Q:8,a:.08,hold:.7,d:.4,peak:.07})}),e.burst(t,{kind:`white`,type:`highpass`,f:3e3,a:.02,d:1.2,peak:.15}),1.4;let r=e.gain(0,e.out),i=e.filter(`lowpass`,400,2,r);return i.frequency.setValueAtTime(400,t),i.frequency.exponentialRampToValueAtTime(3e3*n,t+.9),e.osc(`sawtooth`,180*n,t,1.6,i).frequency.exponentialRampToValueAtTime(900*n,t+.9),Ag(r.gain,t,.3,.12,.9,.3),e.tone(t,{f:2e3*n,f1:4200*n,sweep:.9,a:.3,hold:.3,d:.8,peak:.04}),e.burst(t,{kind:`white`,type:`bandpass`,f:600*n,f1:1800*n,sweep:.9,Q:1,a:.2,hold:.3,d:1,peak:.2}),e.tone(t,{f:70*n,f1:110*n,sweep:.9,a:.25,hold:.3,d:.7,peak:.2}),1.7},levelUp(e){let{t,p:n}=e;return[587.3,659.3,784,880,1174.7].forEach((r,i)=>{let a=t+i*.07;e.tone(a,{f:r*n,a:.002,d:.8,peak:.08,dest:[e.out,e.wet]}),e.tone(a,{f:r*2*n,a:.002,d:.4,peak:.025}),e.tone(a,{f:r*3.01*n,a:.002,d:.15,peak:.01})}),e.tone(t,{type:`triangle`,f:587.3*n,a:.15,d:.9,peak:.035}),e.tone(t,{type:`triangle`,f:880*n,a:.15,d:.9,peak:.03}),e.burst(t,{kind:`white`,type:`bandpass`,f:7e3,Q:2,a:.2,d:.6,peak:.03}),1.4},gold(e){let{t,p:n}=e;return e.tone(t,{f:1975.5*n,a:.001,d:.25,peak:.11}),e.tone(t,{f:6124.05*n,a:.001,d:.08,peak:.03}),e.tone(t+.07,{f:2637*n,a:.001,d:.4,peak:.11,dest:[e.out,e.wet]}),e.tone(t+.07,{f:7647.3*n,a:.001,d:.1,peak:.025}),e.burst(t,{kind:`white`,type:`highpass`,f:6e3,a:5e-4,d:.006,peak:.1}),.6},uiClick(e){let{t,p:n}=e;return e.tone(t,{f:1700*n,f1:1200*n,sweep:.02,a:8e-4,d:.035,peak:.14}),e.burst(t,{kind:`white`,type:`highpass`,f:4e3,a:5e-4,d:.008,peak:.08}),.08},uiHover(e){return e.tone(e.t,{f:1250*e.p,a:.002,d:.025,peak:.05}),.05},uiError(e){let{t,p:n}=e,r=e.filter(`lowpass`,1200,.7,e.out);return e.tone(t,{type:`square`,f:220*n,a:.003,hold:.05,d:.06,peak:.07,dest:r}),e.tone(t+.11,{type:`square`,f:175*n,a:.003,hold:.07,d:.08,peak:.07,dest:r}),.32},capture(e){let{t,p:n}=e,r=e.gain(0,[e.out,e.echo]),i=e.filter(`lowpass`,250,1.2,r);return i.frequency.setValueAtTime(250,t),i.frequency.exponentialRampToValueAtTime(1500,t+.3),i.frequency.exponentialRampToValueAtTime(900,t+1.2),[110,164.8,220].forEach((r,a)=>{for(let o of[-6,6]){let s=e.osc(`sawtooth`,r*n*.98,t,2,e.gain(a===2?.5:1,i));s.detune.value=o,s.frequency.exponentialRampToValueAtTime(r*n,t+.12),e.lfo(5,r*.002,s.frequency,t,2)}}),Ag(r.gain,t,.12,.09,.6,.9),e.clang(t+.05,{f:587.3*n,ratios:[1,2.01,2.76,4.07],decays:[1.4,1,.6,.4],peak:.05,dest:[e.out,e.wet]}),2.2},death(e){let{t,p:n}=e;Tg(e,t,1,n);let r=e.gain(0,e.out),i=e.filter(`lowpass`,700,.7,r),a=e.filter(`bandpass`,300,3,i),o=e.osc(`sawtooth`,72*n,t+.3,3.2,a);o.frequency.exponentialRampToValueAtTime(44*n,t+3),e.lfo(.7,5,o.frequency,t+.3,3.2),Ag(r.gain,t+.3,.3,.2,1.6,1);for(let r=0;r<3;r++){let r=t+Q(.8,2.2),i=e.gain(0,e.out),a=e.filter(`bandpass`,Q(700,1e3),8,i),o=e.osc(`sawtooth`,Q(140,220)*n,r,.35,a);e.lfo(Q(25,40),20,o.frequency,r,.35,`square`),Ag(i.gain,r,.04,.07,.25)}let s=e.gain(0,e.out),c=e.gain(.5,s);return e.lfo(7,.45,c.gain,t+.8,3),e.noise(`brown`,t+.8,3,1,e.filter(`lowpass`,400,1,c)),Ag(s.gain,t+.8,.5,.25,1.5,1),Eg(e,t+1,8,2.5,250,700,.06),4.2},towerDown(e){let{t,p:n}=e;e.tone(t,{f:60*n,f1:24*n,sweep:.8,a:.003,d:1.2,peak:1}),e.burst(t,{kind:`pink`,type:`lowpass`,f:2500*n,f1:200*n,sweep:1,a:.002,d:1.3,peak:.8,dest:[e.out,e.echo]}),e.burst(t,{kind:`white`,type:`highpass`,f:1500,a:6e-4,d:.05,peak:.45});for(let r=0;r<5;r++){let i=t+.3+r*Q(.22,.34);e.burst(i,{kind:`crackle`,type:`lowpass`,f:1800,a:.005,d:.4,peak:.35}),e.tone(i,{f:Q(80,100)*n,f1:40*n,sweep:.2,a:.002,d:.25,peak:.4})}return e.burst(t+.1,{kind:`brown`,type:`lowpass`,f:300*n,a:.2,hold:1,d:2,peak:.45,dest:[e.out,e.wet]}),e.clang(t+.5,{f:Q(200,280)*n,ratios:[1,2.4,3.9],decays:[1,.7,.4],peak:.1}),e.clang(t+1.1,{f:Q(160,230)*n,ratios:[1,2.6,4.3],decays:[.9,.6,.4],peak:.08}),4.2},sailFlap(e){let{t,p:n}=e,r=t;for(let t=0;t<3;t++)e.burst(r,{kind:`pink`,type:`bandpass`,f:Q(500,800)*n,Q:.9,a:.005,d:.08,peak:.35*(1-t*.2)}),e.burst(r,{kind:`brown`,type:`lowpass`,f:300*n,a:.004,d:.1,peak:.25*(1-t*.2)}),r+=Q(.1,.15);return .6}};function Ag(e,t,n,r,i,a=0){e.setValueAtTime(0,t),e.linearRampToValueAtTime(r,t+n),a&&e.setValueAtTime(r,t+n+a),e.exponentialRampToValueAtTime(1e-4,t+n+a+i),e.setValueAtTime(0,t+n+a+i+.005)}Object.keys(kg);function jg(e,t,n,r){e.setValueAtTime(t,n),e.exponentialRampToValueAtTime(1e-4,n+r),e.setValueAtTime(0,n+r+.005)}function Mg(e,t,n,r,i,{bend:a=0,vib:o=0}={}){let s=Sg(e.ctx,e.res,r),c=e.gain(i,t),l=e.buffer(s,n,1,c),u=l.playbackRate;return a&&(u.setValueAtTime(2**(a/12),n),u.setTargetAtTime(1,n+.03,.045)),o&&(u.setValueAtTime(1,n+.28),u.linearRampToValueAtTime(1+o,n+.4),u.linearRampToValueAtTime(1-o*.5,n+.52),u.linearRampToValueAtTime(1+o*.6,n+.64),u.linearRampToValueAtTime(1,n+.8)),l}function Ng(e,t,n,r,i=70){let a=i<80;e.tone(n,{f:i*1.75,f1:i,sweep:.05,a:.002,d:a?.75:.4,peak:.7*r,dest:t}),e.tone(n,{type:`triangle`,f:i*2.4,f1:i*1.5,sweep:.04,a:.001,d:.1,peak:.22*r,dest:t}),e.burst(n,{kind:`pink`,type:`lowpass`,f:1500,Q:.7,a:.001,d:.06,peak:.45*r,dest:t}),a&&e.tone(n,{f:i*.62,a:.004,d:.9,peak:.32*r,dest:t})}function Pg(e,t,n,r){e.burst(n,{kind:`white`,type:`bandpass`,f:2300,Q:2.5,a:5e-4,d:.035,peak:.5*r,dest:t}),e.tone(n,{type:`triangle`,f:780,f1:600,sweep:.03,a:5e-4,d:.05,peak:.2*r,dest:t})}function Fg(e,t,n,r,i=110,a=6){let o=[1,1.483,1.932,2.546,2.987,3.41,4.18,5.03,6.12],s=[1,.7,.55,.45,.38,.3,.22,.15,.1];for(let c=0;c<o.length;c++){let l=e.gain(0,t),u=i*o[c]*Q(.997,1.003);e.osc(`sine`,u*.985,n,a+.15,l).frequency.exponentialRampToValueAtTime(u,n+.7);let d=.004+c*.05,f=a/(1+c*.3);l.gain.setValueAtTime(0,n),l.gain.linearRampToValueAtTime(s[c]*r*.11,n+d),l.gain.exponentialRampToValueAtTime(1e-4,n+d+f)}e.burst(n,{kind:`brown`,type:`lowpass`,f:300,a:.002,d:.35,peak:.3*r,dest:t}),e.tone(n,{f:i*.5,a:.005,d:1.6,peak:.16*r,dest:t}),e.burst(n,{kind:`white`,type:`bandpass`,f:4200,Q:1,a:.5,d:a*.5,peak:.035*r,dest:t})}function Ig(e,t,n,r,i,a,o=.5,{rel:s=.5,scoop:c=!0}={}){let l=lg(r),u=i+s+.1,d=e.gain(0,t),f=e.filter(`lowpass`,l*1.2,1.1,d);f.frequency.setValueAtTime(l*1.2,n),f.frequency.exponentialRampToValueAtTime(Math.min(l*(2.5+7*o),11e3),n+.08),f.frequency.exponentialRampToValueAtTime(Math.min(l*(1.8+4*o),8e3),n+.35),f.frequency.setTargetAtTime(l*1.1,n+i,s*.35);let p=e.gain(0);e.osc(`sine`,Q(4.6,5.4),n,u,p),p.gain.setValueAtTime(0,n),p.gain.linearRampToValueAtTime(7,n+Math.min(.7,i));for(let t of[-7,6]){let r=e.osc(`sawtooth`,l,n,u,f);r.detune.setValueAtTime(c?t-35:t,n),r.detune.linearRampToValueAtTime(t,n+.07),p.connect(r.detune)}e.osc(`square`,l*.5,n,u,e.gain(.3,f));let m=Math.min(.3,i*.6);d.gain.setValueAtTime(0,n),d.gain.linearRampToValueAtTime(a,n+.05),d.gain.linearRampToValueAtTime(a*.8,n+m),jg(d.gain,a*.8,n+Math.max(i,m+.01),s)}function Lg(e,t,n,r,i,a,{a:o=1.2,rel:s=1.6}={}){let c=i+s+.15,l=e.gain(0,t),u=e.gain(1);for(let[t,n,r]of[[760,5,1],[1150,7,.55],[2600,9,.22]])u.connect(e.filter(`bandpass`,t,n,e.gain(r,l)));let d=e.gain(9);e.osc(`sine`,5.1,n,c,d);for(let t of r)for(let r of[-9,0,9]){let i=e.osc(`sawtooth`,lg(t),n,c,u);i.detune.value=r+Q(-3,3),d.connect(i.detune)}let f=Math.min(o,i);l.gain.setValueAtTime(0,n),l.gain.linearRampToValueAtTime(a,n+f),jg(l.gain,a,n+Math.max(i,f+.01),s),e.burst(n,{kind:`pink`,type:`bandpass`,f:1300,Q:.8,a:f,hold:Math.max(0,i-f),d:s,peak:a*.05,dest:t})}function Rg(e,t,n,r,i,a,o=1200,{a:s=1.6,rel:c=2.4}={}){let l=i+c+.1,u=e.gain(0,t),d=e.filter(`lowpass`,o*.6,.6,u);d.frequency.setValueAtTime(o*.6,n),d.frequency.linearRampToValueAtTime(o,n+i*.5),d.frequency.linearRampToValueAtTime(o*.7,n+i+c);for(let t of r)for(let r of[-7,7]){let i=e.osc(`sawtooth`,lg(t),n,l,d);i.detune.value=r+Q(-2,2)}u.gain.setValueAtTime(0,n),u.gain.linearRampToValueAtTime(a,n+s),jg(u.gain,a,n+i,c)}function zg(e,t,n,r,i,a,o=.5){let s=i+1.4,c=e.gain(0,t),l=e.filter(`lowpass`,280,.9,c),u=n+i*.8;l.frequency.setValueAtTime(280,n),l.frequency.exponentialRampToValueAtTime(350+2600*o,u),l.frequency.exponentialRampToValueAtTime(300,n+i+1.2);let d=e.gain(8);e.osc(`sine`,4.8,n,s,d);for(let t of r)for(let r of[-10,0,10]){let i=e.osc(`sawtooth`,lg(t),n,s,l);i.detune.value=r+Q(-2,2),d.connect(i.detune)}c.gain.setValueAtTime(0,n),c.gain.linearRampToValueAtTime(a*.2,n+.4),c.gain.linearRampToValueAtTime(a,u),jg(c.gain,a,u+.01,i-(u-n)+1.2)}function Bg(e,t,n,r,i,a,o=`dizi`,s=null){let c=o===`erhu`,l=0;for(let e of r)l+=e.b*i;let u=n+l,d=e.gain(0,t),f=d;if(c){let t=e.filter(`peaking`,1100,1.2,d);t.gain.value=5,f=e.filter(`lowpass`,2400,.8,t)}let p=e.osc(c?`sawtooth`:`triangle`,lg(r[0].m),n,l+1,f),m=c?null:e.osc(`sine`,lg(r[0].m)*2,n,l+1,e.gain(.18,d)),h=e.gain(0);e.osc(`sine`,c?5.6:5.2,n,l+1,h),h.connect(p.detune),m&&h.connect(m.detune);let g=e.gain(c?.05:.09,d),_=e.filter(`bandpass`,lg(r[0].m)*2,3,g);e.noise(`pink`,n,l+1,1,_);let v=c?.045:.012,y=(e,t,n)=>{p.frequency.setTargetAtTime(e,t,n),m&&m.frequency.setTargetAtTime(e*2,t,n),_.frequency.setTargetAtTime(e*2,t,n)};d.gain.setValueAtTime(0,n),d.gain.linearRampToValueAtTime(a,n+(c?.15:.07));let b=n;r.forEach((e,t)=>{let n=lg(e.m),r=e.b*i;if(t>0){if(c||(d.gain.setTargetAtTime(a*.4,b-.035,.01),d.gain.setTargetAtTime(a,b,.02)),!c&&s&&Math.random()<.28){let t=s.indexOf(e.m),r=t>=0&&t<s.length-1?s[t+1]:e.m+2;y(lg(r),b,.004),y(n,b+.06,.008)}else y(n,b,v*(c&&Math.random()<.5?2.2:1))}h.gain.setValueAtTime(0,b+.001),h.gain.linearRampToValueAtTime(c?16:11,b+Math.min(.45,r*.7)),b+=r}),d.gain.setTargetAtTime(0,u-.05,c?.2:.14),d.gain.setValueAtTime(0,u+.95)}var Vg=60/90,Hg=Vg/4,Ug=32,Wg=[];for(let e=38;e<=98;e++)[0,2,4,7,9].includes(e%12)&&Wg.push(e);var Gg={Dm:{pad:[50,57,62,65],root:38,anchor:62,swell:[38,50,57]},Dsus:{pad:[50,57,64,69],root:38,anchor:62,swell:[38,50,57]},C:{pad:[48,55,64,67],root:36,anchor:60,swell:[36,48,55]},Cadd:{pad:[48,55,62,64],root:36,anchor:60,swell:[36,48,55]},G:{pad:[55,59,62,67],root:43,anchor:67,swell:[43,55,62]},Gsus:{pad:[55,62,67,69],root:43,anchor:67,swell:[43,55,62]},F:{pad:[53,57,60,64],root:41,anchor:60,swell:[41,53,60]},Am:{pad:[57,60,64,67],root:45,anchor:64,swell:[45,57,64]},Asus:{pad:[57,62,64,69],root:45,anchor:64,swell:[45,57,64]},Em:{pad:[52,59,62,67],root:40,anchor:64,swell:[40,52,59]},Bb:{pad:[58,62,65,69],root:46,anchor:62,swell:[46,58,65]}},Kg=[[`Dm`,`C`,`Gsus`,`Dm`],[`Dsus`,`F`,`C`,`Dm`],[`Dm`,`Am`,`C`,`Dsus`],[`F`,`C`,`Dm`,`Asus`],[`Dm`,`Em`,`F`,`C`],[`Dsus`,`Cadd`,`Gsus`,`Asus`],[`Am`,`F`,`C`,`Dm`],[`Dm`,`G`,`Dm`,`Cadd`]],qg=[[`Dm`,`Bb`,`C`,`Dm`],[`Dm`,`C`,`Bb`,`Asus`],[`Dm`,`F`,`G`,`Asus`],[`Dm`,`Dm`,`Bb`,`C`],[`Am`,`Bb`,`C`,`Dm`],[`Dm`,`C`,`F`,`G`],[`Bb`,`C`,`Dm`,`Dm`]],Jg=[[0,2,4,2,5,4,2,1,0,2,4,5,7,5,4,2],[0,4,3,4,2,4,1,4,0,4,3,4,5,4,2,4],[0,1,2,4,5,4,2,1,0,1,2,4,2,1,0,-1],[4,2,0,2,3,2,0,-1,0,2,3,4,5,3,2,0],[0,null,4,2,null,5,4,null,0,null,4,2,5,7,5,4],[0,2,0,4,0,5,0,4,0,2,0,4,3,2,1,2],[5,4,2,4,0,2,1,2,5,4,2,4,7,5,4,2]],Yg=[[`................`,`................`],[`X...............`,`X.........o.....`],[`X.....x.X...x...`,`X.....x.X..xX.x.`],[`X..x..x.X.x.X..x`,`X..x..x.X.xxX.xx`],[`X.xX.xX.XxX.X.xX`,`X.xX.xX.XxXxXxxx`]],Xg=[`................`,`................`,`....r.......r...`,`..r...r...r...rr`,`rrRrrrRrrrRrrrRr`],Zg=`........x.x.xxXX`,Qg=[[[57,1.5],[62,.5],[64,2]],[[62,1],[64,.5],[67,.5],[69,2.5]],[[69,1.5],[67,.5],[64,1],[62,2]],[[50,1],[57,1],[62,2.5]],[[62,.5],[67,.5],[69,3]]],$g=class{constructor(e){this.eng=e,this.ctx=e.ctx,this.k=new Cg(e.ctx,e.res),this.running=!1,this.target=0,this.I=0,this.stopAt=1/0,this.L=null,this.timer=null,this.lastProg=-1,this.lastPat=-1,this.lastOnset=-99,this.combat=!1}_build(){let e=this.k,t=this.eng.musicIn,n=this.eng.hallIn,r=(r,i)=>{let a=e.gain(r,t);return a.connect(e.gain(i,n)),a},i={drone:r(.12,.15),pad:r(2,.35),pluck:r(2,.4),swell:r(1.5,.35),drums:r(0,.16),lead:r(1.8,.5)},a=e.filter(`peaking`,220,1,i.pluck);a.gain.value=2.5;let o=e.filter(`highshelf`,5200,.7,a);o.gain.value=-4,i.pluckL=e.pan(-.3,o),i.pluckR=e.pan(.3,o),i.drumL=e.pan(-.25,i.drums),i.drumR=e.pan(.25,i.drums),this.L=i}setIntensity(e){this.target=dg(+e||0)}start(){let e=this.ctx.currentTime;this.L||this._build();let t=this.eng.musicFade.gain;if(t.cancelScheduledValues(e),t.setValueAtTime(t.value,e),t.linearRampToValueAtTime(1,e+2.5),this.running){this.stopAt=1/0;return}this.running=!0,this.stopAt=1/0,this.I=this.target;for(let e of Wg)e>=48&&e<=90&&Sg(this.ctx,this.eng.res,e);this._startDrone(e),this.step=0,this.next=e+.12,this.prog=Kg[0],this.opening=!0,this.eng.offline||this._tick()}stop(e=2){if(!this.running)return;let t=this.ctx.currentTime,n=Math.max(.05,+e||0),r=this.eng.musicFade.gain;if(r.cancelScheduledValues(t),r.setValueAtTime(r.value,t),r.linearRampToValueAtTime(0,t+n),this.stopAt=t+n,this.eng.offline)for(let e of this.drone||[])e.stop(t+n+.1)}_finish(){let e=this.ctx.currentTime;for(let t of this.drone||[])try{t.stop(e+.05)}catch{}this.running=!1,this.drone=null,this.timer&&clearTimeout(this.timer),this.timer=null}_tick(){if(this.timer=null,!this.running)return;let e=this.ctx.currentTime;if(e>=this.stopAt){this._finish();return}let t=typeof document<`u`&&document.hidden;this.scheduleUntil(e+(t?1.3:.2)),this.timer=setTimeout(()=>this._tick(),25)}scheduleUntil(e){if(!this.running)return;let t=this.ctx.currentTime;for(this.next<t-.06&&(this.next=t+.03);this.next<e&&this.next<this.stopAt;)this._step(this.step,this.next),this.next+=Hg,this.step++}_startDrone(e){let t=this.k,n=t.gain(0,this.L.drone);n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(1,e+5);let r=t.filter(`lowpass`,200,1.2,n);this.droneLP=r;let i=(n,r,i,a,o=0)=>{let s=this.ctx.createOscillator();return s.type=n,s.frequency.value=r,s.detune.value=o,s.connect(t.gain(i,a)),s.start(e),s},a=i(`sine`,.045,70,r.frequency);this.drone=[i(`sine`,36.71,.25,n),i(`triangle`,73.42,.5,r),i(`sawtooth`,73.42,.22,r,6),i(`sawtooth`,110,.16,r,-5),a]}_step(e,t){let n=e%16,r=e/16|0,i=r%8,a=r%2,o=i>>1,s=this.target-this.I;this.I+=s>0?Math.min(s,.5*Hg):Math.max(s,-.07*Hg),n===0&&(i===0&&this._section(r/8|0,t),this._bar(i,t),a===0&&this._chord(o,t)),this._pluckStep(n,a,i,t),this._drumStep(n,a,i,t)}_section(e,t){let n=this.I,r=n>.5?qg:Kg,i;do i=Math.random()*r.length|0;while(r.length>1&&r===this.lastPool&&i===this.lastProg);this.lastPool=r,this.lastProg=i,this.prog=this.opening?Kg[0]:r[i];let a;do a=Math.random()*Jg.length|0;while(a===this.lastPat);if(this.lastPat=a,this.pat=Jg[a],this.shifts=[0,ug([-1,0,1,2]),0,ug([-1,1,2])],this.breath=e%4==3&&n<.7,this.plan=null,!this.opening){if(n<.6&&!this.hadLead&&Math.random()<.7){let e=Math.random()<.62?`dizi`:`erhu`;this.plan={kind:`lead`,bar:ug([1,2,4]),off:ug([0,1,2]),variant:e}}else n>=.55&&Math.random()<.6&&(this.plan={kind:`horn`,bar:ug([2,4]),off:ug([0,1])})}this.hadLead=!!this.plan&&this.plan.kind===`lead`,this.opening?Fg(this.k,this.L.pad,t,.35,98,7):n>.78&&e%2==0&&Fg(this.k,this.L.drums,t,.45,104,6),this.opening=!1}_bar(e,t){let n=this.I,r=this.L;if(r.drums.gain.setTargetAtTime(.75*fg(.1,.45,n),t,.6),r.pad.gain.setTargetAtTime(2*(.95-.3*n),t,1.5),this.droneLP.frequency.setTargetAtTime(170+260*n,t,2),n>.6&&!this.combat){if(this.combat=!0,t-this.lastOnset>20){this.lastOnset=t,Ng(this.k,r.drums,t,1,60),Fg(this.k,r.drums,t,.55,96,6);for(let e of[50,57,62])Ig(this.k,r.swell,t,e,.7,.05,.85,{rel:1.2})}}else n<.3&&this.combat&&(this.combat=!1,Fg(this.k,r.pad,t,.22,92,7));let i=this.plan;if(i&&i.bar===e){let e=t+i.off*Vg;if(i.kind===`lead`)Bg(this.k,r.lead,e,this._phrase(i.variant),Vg,i.variant===`erhu`?.09:.1,i.variant,Wg);else{let t=ug(Qg),i=e,a=.45+.4*n;for(let[e,n]of t)Ig(this.k,r.swell,i,e,n*Vg*.95,.06,a,{rel:.6}),Ig(this.k,r.swell,i,e-12,n*Vg*.95,.04,a*.7,{rel:.6,scoop:!1}),i+=n*Vg}this.plan=null}}_phrase(e){let t=e===`erhu`,n=Wg.indexOf(t?62:74),r=Wg.indexOf(t?81:86),i=n+(Math.random()*4|0),a=4+(Math.random()*4|0),o=[],s=0;for(let e=0;e<a&&s<10;e++){let t=ug(e===0?[1,1.5,2]:[.5,1,1,1.5,2,.5,1]);o.push({m:Wg[i],b:t}),s+=t;let a=ug([-2,-1,-1,1,1,2,0]);a===0&&e>0&&o[e-1].m===Wg[i]&&(a=1),i=dg(i+a,n-1,r)}let c=Wg.filter((e,t)=>t>=n-1&&t<=r&&(e%12==2||e%12==9)),l=o[o.length-1].m;return c.sort((e,t)=>Math.abs(e-l)-Math.abs(t-l)),o.push({m:c[0],b:ug([2.5,3,4])}),o}_chord(e,t){let n=this.I,r=this.k,i=this.L,a=Gg[this.prog[e]];this.chord=a,this.anchorIdx=Wg.indexOf(a.anchor)+this.shifts[e];let o=Ug*Hg;if(Rg(r,i.pad,t,a.pad,o,.022,650+1400*n),Mg(r,i.pluckL,t+Q(0,.01),a.root+12,.34),n>.2){let e=.015+.03*fg(.2,.8,n);zg(r,i.swell,t,a.swell,o,e,n)}if(n>.74&&Lg(r,i.pad,t,a.pad,o*.9,.05*fg(.74,1,n),{a:1.8,rel:2}),n>.7&&e%2==1){let e=t+16*Hg;for(let t of[a.swell[1],a.swell[2]])Ig(r,i.swell,e,t,12*Hg,.03+.02*n,.4+.4*n,{rel:.8})}}_pluckStep(e,t,n,r){if(this.breath&&n>=6){e===0&&n===6&&Mg(this.k,this.L.pluckR,r,this.chord.anchor+12,.22,{vib:.02});return}let i=this.I,a=r+Q(-.004,.006);if(e%2==0){let n=t*8+(e>>1),r=this.pat[n];if(r==null)return;if(i<.12){if(e%4!=0||e!==0&&Math.random()>.7)return}else if(i<.3&&e!==0&&Math.random()>.78)return;let o=Wg[dg(this.anchorIdx+r,0,Wg.length-1)],s=(e%8==0?1:e%4==0?.8:.64)*(.17+.07*i)*Q(.9,1.08),c={};e===0&&Math.random()<.14?c.bend=-2:e%8==0&&Math.random()<.08&&(c.vib=.022),Mg(this.k,n&1?this.L.pluckR:this.L.pluckL,a,o,s,c),this.lastPluck=o}else if(i>.62&&Math.random()<(i-.62)*2.2){let e=Math.random()<.5?this.lastPluck||this.chord.anchor:Wg[dg(this.anchorIdx+5,0,Wg.length-1)];Mg(this.k,this.L.pluckR,a,e,.075*Q(.85,1.1))}}_drumStep(e,t,n,r){let i=this.I,a=i<.14?0:i<.4?1:i<.65?2:i<.85?3:4;if(a===0)return;let o=Yg[a][t][e];n===7&&i>.45&&e>=8&&(o=Zg[e]);let s=this.k,c=this.L,l=r+Q(-.004,.004),u=.6+.4*i;o===`X`?Ng(s,c.drums,l,u*Q(.92,1.05),62):o===`o`?Ng(s,c.drums,l,u*.5,64):o===`x`&&Ng(s,e%4<2?c.drumL:c.drumR,l,u*Q(.5,.7),96);let d=Xg[a][e];d!==`.`&&d&&Pg(s,e&2?c.drumR:c.drumL,l,(d===`R`?.45:.25)*u*Q(.8,1.1))}},e_={ageUp(e,t,n,r){return Fg(e,[t,n],r,.55,98,6),Ng(e,t,r,1,60),Ng(e,t,r+Vg*.5,.6,90),[50,57,62,66,69].forEach((i,a)=>{let o=r+.1+a*.12;Ig(e,[t,n],o,i,2.6-a*.12,.06,.55+a*.08,{rel:1.4})}),Lg(e,[t,n],r+.2,[62,66,69,74],2.6,.07,{a:1.2,rel:1.8}),[74,76,78,81,86].forEach((i,a)=>Mg(e,[t,n],r+.55+a*.065,i,.22)),Ng(e,t,r+2.2,.7,62),4.8},victory(e,t,n,r){for(let n=0;n<9;n++)Ng(e,t,r+1*(1-(1-n/9)**1.6),.3+.07*n,n%2?96:70);let i=r+1.1;Ng(e,t,i,1,58),Fg(e,[t,n],i,.6,96,6);let a=i;for(let[r,i]of[[62,.34],[69,.34],[74,1.1]])Ig(e,[t,n],a,r,i,.07,.75,{rel:.5}),Ig(e,[t,n],a,r-12,i,.045,.5,{rel:.5,scoop:!1}),a+=i;let o=i+1.25;for(let r of[50,57,62,66,69])Ig(e,[t,n],o,r,2,.05,.7,{rel:1.6});return Lg(e,[t,n],i,[62,66,69,74],3.2,.07,{a:1,rel:1.8}),[86,83,81,78,76,74].forEach((r,i)=>Mg(e,[t,n],o+i*.08,r,.2)),Ng(e,t,o,.9,60),Ng(e,t,o+2,.6,62),6.2},defeat(e,t,n,r){Fg(e,[t,n],r,.6,70,7),Ng(e,t,r,.55,58),Ng(e,t,r+2.7,.45,58);let i=r;for(let[r,a]of[[57,1],[55,.8],[53,1],[50,2.2]])Ig(e,[t,n],i,r,a,.05,.25,{rel:.9,scoop:!1}),i+=a;return Ig(e,[t,n],r,38,4.6,.04,.15,{rel:1.2,scoop:!1}),Lg(e,[t,n],r+.3,[50,57,62,65],3.8,.05,{a:1.8,rel:1.8}),Bg(e,[t,n],r+.6,[{m:74,b:.9},{m:72,b:.6},{m:69,b:1.6},{m:67,b:.7},{m:65,b:.7},{m:62,b:2.5}],.5,.08,`erhu`),6.2},firstBlood(e,t,n,r){Ng(e,t,r,.9,60),Ng(e,t,r+.18,.6,92);for(let i of[50,57,62,67])Ig(e,[t,n],r,i,.45,.05,.8,{rel:1});return Fg(e,n,r,.25,150,3),2.6},towerDown(e,t,n,r){Ng(e,t,r,1,56),e.tone(r,{f:50,f1:30,sweep:.8,a:.003,d:1.2,peak:.35,dest:t});for(let i of[38,50,57])Ig(e,[t,n],r,i,.6,.05,.6,{rel:1.2});return e.burst(r,{kind:`white`,type:`highpass`,f:5e3,a:.01,d:1.5,peak:.06,dest:[t,n]}),2.8},enemyAge(e,t,n,r){e.burst(r,{kind:`white`,type:`bandpass`,f:200,f1:2200,sweep:1.15,Q:2,a:1.1,d:.05,peak:.12,dest:t});for(let i of[50,51,57])Ig(e,[t,n],r+.2,i,1.6,.045,.3,{rel:1.4,scoop:!1});return Ig(e,[t,n],r+.2,38,1.6,.04,.2,{rel:1.4,scoop:!1}),Ng(e,t,r+1.15,.8,58),Ng(e,t,r+1.5,.6,62),3.4},matchStart(e,t,n,r){Fg(e,[t,n],r,.5,100,6),[.6,1,1.3,1.5].forEach((n,i)=>Ng(e,t,r+n,.55+i*.12,i<3?64:58));let i=r+1.65;for(let[r,a]of[[62,.4],[67,.4],[69,1.6]])Ig(e,[t,n],i,r,a,.06,.65,{rel:.8}),Ig(e,[t,n],i,r-12,a,.04,.45,{rel:.8,scoop:!1}),i+=a;return Lg(e,[t,n],r+1.65,[50,57,62,69],2,.045,{a:1.2,rel:1.5}),4.4},warning(e,t,n,r){let i=e.filter(`lowpass`,1800,.8,[t,n]);for(let t of[0,.3])e.tone(r+t,{type:`square`,f:440,a:.015,hold:.14,d:.14,peak:.05,dest:i}),e.tone(r+t,{type:`square`,f:659.3,a:.015,hold:.14,d:.14,peak:.035,dest:i});return Ng(e,t,r,.5,70),1.3}},t_=class{constructor(e){this.eng=e,this.ctx=e.ctx,this.k=new Cg(e.ctx,e.res),this.on=!1,this.srcs=[]}_loop(e,t,n=1){let r=this.ctx.createBufferSource();return r.buffer=this.eng.res[e],r.loop=!0,r.playbackRate.value=n,r.connect(t),r.start(this.ctx.currentTime,Math.random()*r.buffer.duration),this.srcs.push(r),r}start(){if(this.on)return;this.on=!0;let e=this.k,t=this.ctx.currentTime;this.out=e.gain(0,this.eng.ambIn),this.out.gain.setValueAtTime(0,t),this.out.gain.linearRampToValueAtTime(1,t+3),this.surfBus=e.gain(1,this.out),this.windBus=e.gain(1,this.out);for(let t of[-.5,.5])this._loop(`pink`,e.filter(`lowpass`,330+t*40,.6,e.gain(.05,e.pan(t,this.surfBus))),Q(.97,1.03));this.surf=[-.6,.6].map(n=>{let r=e.gain(0,e.pan(n,this.surfBus)),i=e.filter(`lowpass`,300,.7,r);return this._loop(`brown`,i),this._loop(`white`,e.filter(`bandpass`,2600,.6,e.gain(.035,r))),{g:r,lp:i,next:t+Q(.2,2.5)}}),this.windG=e.gain(.03,this.windBus),this.windBP=e.filter(`bandpass`,700,.8,this.windG),this._loop(`white`,this.windBP),this.whistleG=e.gain(.004,this.windBus),this.whistleBP=e.filter(`bandpass`,1700,14,this.whistleG),this._loop(`white`,this.whistleBP),this.nextWind=t,this.nextGull=t+Q(10,25),this.setZoom(this.eng.listener.zoom)}stop(e=2){if(!this.on)return;this.on=!1;let t=this.ctx.currentTime;this.out.gain.cancelScheduledValues(t),this.out.gain.setValueAtTime(this.out.gain.value,t),this.out.gain.linearRampToValueAtTime(0,t+e);for(let n of this.srcs)n.stop(t+e+.05);this.srcs=[]}setZoom(e){if(!this.on)return;let t=dg((e-100)/160),n=this.ctx.currentTime;this.surfBus.gain.setTargetAtTime(1.15-.4*t,n,.5),this.windBus.gain.setTargetAtTime(.7+.7*t,n,.5)}update(e){if(this.on){for(let t of this.surf)if(t.next<e+1.5){let n=Math.max(t.next,e+.05),r=Q(1.4,2.8),i=Q(2.5,4.8),a=Q(.12,.26),o=t.g.gain,s=t.lp.frequency;o.setValueAtTime(o.value>.01?Math.min(o.value,.05):.02,n),o.linearRampToValueAtTime(a,n+r),o.linearRampToValueAtTime(.02,n+r+i),s.setValueAtTime(260,n),s.exponentialRampToValueAtTime(Q(700,1100),n+r),s.exponentialRampToValueAtTime(240,n+r+i),t.next=n+r+i*Q(.55,.85)+Q(0,1.5)}e>this.nextWind&&(this.windBP.frequency.setTargetAtTime(Q(450,1100),e,2.5),this.windG.gain.setTargetAtTime(Q(.018,.045),e,2.5),this.whistleBP.frequency.setTargetAtTime(Q(1300,2200),e,3),this.whistleG.gain.setTargetAtTime(Math.random()<.4?Q(.003,.009):.0015,e,3),this.nextWind=e+Q(3,7)),e>this.nextGull&&(this._gull(e+.1),this.nextGull=e+Q(14,40))}}_gull(e){let t=this.k,n=t.gain(Q(.5,1),t.pan(Q(-.8,.8),[this.out,this.eng.sfxRevIn])),r=2+(Math.random()*3|0),i=Q(950,1250);for(let a=0;a<r;a++){let r=e+a*Q(.32,.5),o=t.gain(0,n),s=t.filter(`bandpass`,1800,2,o);for(let[e,n]of[[`sawtooth`,.4],[`triangle`,1]]){let a=t.osc(e,i,r,.45,t.gain(n,s)).frequency;a.setValueAtTime(i*.9,r),a.exponentialRampToValueAtTime(i*1.4,r+.07),a.exponentialRampToValueAtTime(i*.75,r+.36)}o.gain.setValueAtTime(0,r),o.gain.linearRampToValueAtTime(.012,r+.03),o.gain.exponentialRampToValueAtTime(1e-4,r+.38)}}},n_=class{constructor(e){this.eng=e,this.ctx=e.ctx,this.k=new Cg(e.ctx,e.res),this.built=!1,this.count=0}_build(){let e=this.k,t=this.ctx,n=t.currentTime;this.built=!0,this.out=e.gain(0,this.eng.sfxIn);let r=e.gain(.7,this.out),i=e.filter(`lowpass`,9,.7,e.gain(.9,r.gain)),a=t.createBufferSource();a.buffer=this.eng.res.brown,a.loop=!0,a.connect(i),a.start(n),this.bp=e.filter(`bandpass`,900,.6,r),this.layers=[];let o=[118,141,163,187,211,246,131,199];o.forEach((r,i)=>{let a=e.gain(0,this.bp),s=t.createOscillator();s.type=i%3==2?`square`:`sawtooth`,s.frequency.value=r,s.detune.value=Q(-30,30),s.connect(a),s.start(n);let c=t.createOscillator();c.frequency.value=Q(3,9);let l=e.gain(Q(8,20),s.detune);c.connect(l),c.start(n),this.layers.push({g:a,o:s,at:i/o.length})}),this.hiss=e.gain(0,this.out);let s=e.filter(`bandpass`,4200,1.5,this.hiss),c=t.createBufferSource();c.buffer=this.eng.res.white,c.loop=!0,c.connect(s),c.start(n),this.whine=e.gain(0,this.out),this.whineO=t.createOscillator(),this.whineO.frequency.value=2300,this.whineO.connect(this.whine),this.whineO.start(n)}set(e){let t=dg(+e||0,0,200);if(this.count=t,t<=0&&!this.built)return;this.built||this._build();let n=t/200,r=this.ctx.currentTime,i=t<=0?0:.05+.3*Math.sqrt(n);this.out.gain.setTargetAtTime(i,r,.25),this.layers.forEach((e,i)=>{let a=i===0?+(t>0):fg(e.at*.6,e.at*.6+.12,n);e.g.gain.setTargetAtTime(.12*a,r,.3)}),this.bp.frequency.setTargetAtTime(650+1500*n,r,.4),this.hiss.gain.setTargetAtTime(.25*n,r,.4),this.whine.gain.setTargetAtTime(.006*Math.sqrt(n),r,.4)}update(e){if(!(!this.built||this.count<=0)){for(let t of this.layers)Math.random()<.3&&t.o.detune.setTargetAtTime(Q(-40,40),e,.6);this.whineO.frequency.setTargetAtTime(Q(2e3,2800),e,.8)}}};Object.keys(e_);var r_=48,i_=.025,a_=180,o_=420,s_={victory:9,defeat:9,ageUp:7,enemyAge:5,matchStart:8,firstBlood:4,towerDown:4,warning:3};function c_(e=2048){let t=new Float32Array(e);for(let n=0;n<e;n++){let r=(n/(e-1)*2-1)*2,i=Math.sign(r),a=Math.abs(r);t[n]=i*(a<=.8?a:.8+.18*Math.tanh((a-.8)/.18))}return t}var l_=class{constructor(e,{offline:t=!1,raw:n=!1}={}){this.ctx=e,this.offline=t,this.res=gg(e),this.k=new Cg(e,this.res),this.voices=[],this.last=Object.create(null),this.listener={x:0,z:0,zoom:a_},this.stingers=[],this.warned=new Set,this._build(n),this.music=new $g(this),this.ambience=new t_(this),this.swarm=new n_(this),t||this._slowTick()}_build(e){let t=this.k,n=this.ctx;if(this.preMaster=t.gain(1),e)this.preMaster.connect(n.destination),this.masterVol=t.gain(1),this.mute=t.gain(1),this.out=this.preMaster;else{let e=t.filter(`highpass`,24,.7);this.preMaster.connect(e);let r=n.createDynamicsCompressor();r.threshold.value=-16,r.knee.value=10,r.ratio.value=2.5,r.attack.value=.008,r.release.value=.28;let i=n.createDynamicsCompressor();i.threshold.value=-3,i.knee.value=0,i.ratio.value=20,i.attack.value=.001,i.release.value=.12,e.connect(r),r.connect(i),this.masterVol=t.gain(.8),this.mute=t.gain(1),i.connect(this.masterVol),this.masterVol.connect(this.mute);let a=t.gain(.5),o=n.createWaveShaper();o.curve=c_(),o.oversample=`2x`,this.mute.connect(a),a.connect(o),o.connect(n.destination),this.out=o,this.comp=r,this.limiter=i}this.sfxVol=t.gain(.9,this.preMaster),this.sfxIn=t.gain(.55,this.sfxVol),this.ambIn=t.gain(.8,this.sfxVol),this.stingerIn=t.gain(.55,this.sfxVol);let r=n.createConvolver();r.buffer=this.res.irSea,this.sfxRevIn=t.gain(1,r),r.connect(t.gain(.5,this.sfxVol)),this.stingerWet=t.gain(.45,this.sfxRevIn),this.echoIn=t.gain(1);let i=n.createDelay(1.5);i.delayTime.value=.41;let a=t.filter(`lowpass`,1300,.7),o=t.gain(.3);this.echoIn.connect(i),i.connect(a),a.connect(o),o.connect(i),a.connect(t.gain(.35,this.sfxIn)),a.connect(t.gain(.25,this.sfxRevIn)),this.musicVol=t.gain(.6,this.preMaster),this.musicFade=t.gain(0,t.gain(.56,this.musicVol)),this.musicIn=t.gain(1,this.musicFade);let s=n.createConvolver();s.buffer=this.res.irHall,this.hallIn=t.gain(1,s),s.connect(t.gain(.55,this.musicIn))}get radius(){return o_*Math.sqrt(dg(this.listener.zoom,60,400)/a_)}setListener(e,t,n){let r=this.listener;Number.isFinite(e)&&(r.x=e),Number.isFinite(t)&&(r.z=t),Number.isFinite(n)&&n!==r.zoom&&(r.zoom=n,this.ambience.setZoom(n))}play(e,t={}){let n=wg[e],r=kg[e];if(!n)return this.warned.has(e)||(this.warned.add(e),console.warn(`[audio] unknown sound "${e}"`)),null;let i=this.ctx,a=t.vol==null?1:+t.vol;if(!(a>0))return null;let o=i.currentTime+.005+Math.max(0,+t.when||0),s=1,c=0,l=0,u=Number.isFinite(t.x)&&Number.isFinite(t.z);if(u){let e=this.listener,r=this.radius*n.range,i=e.zoom*.3,a=t.x-e.x,o=t.z-e.z,u=Math.hypot(a,o);if(u>=r)return null;let d=dg((u-i)/(r-i));s=(1-d)**1.6/(1+1.5*d),c=dg(a/(r*.55),-1,1)*.8,d>.04&&(l=1500+17e3*(1-d)*(1-d))}let d=1+(Math.random()*2-1)*n.jv,f=a*n.lvl*d;if(f*s<.004)return null;this._prune(o);let p=this.last[e];if(p&&Math.abs(o-p.t)<i_&&f*s<=p.level*1.5)return null;let m=0,h=null;for(let t of this.voices)t.name===e&&(m++,(!h||t.start<h.start)&&(h=t));if(m>=n.cap&&(this._steal(h),m--),this.voices.length>=r_){let e=null,t=1/0;for(let n of this.voices){let r=dg((n.end-o)/(n.end-n.start),.05,1),i=n.pri*n.level*Math.sqrt(r);i<t&&(t=i,e=n)}if(t>=n.pri*f*s)return null;this._steal(e)}f/=1+.12*m;let g=new Cg(i,this.res,!0);g.t=o,g.p=(t.pitch==null?1:+t.pitch||1)*(1+(Math.random()*2-1)*n.jp),g.o=t,g.out=g.gain(1);let _=g.gain(f*s);g.out.connect(_);let v=_,y=[g.out,_];if(l){let e=g.filter(`lowpass`,l,.5);v.connect(e),v=e,y.push(e)}if(u){let e=g.pan(c);v.connect(e),v=e,y.push(e)}v.connect(this.sfxIn),g.wet=g.gain(f*n.rev*Math.sqrt(s),this.sfxRevIn),g.out.connect(g.wet),y.push(g.wet),g.echo=n.echo>0?g.gain(f*n.echo*s**.7,this.echoIn):null,g.echo&&y.push(g.echo);let b;try{b=r(g)}catch(e){for(let e of y)e.disconnect();throw e}let x={name:e,start:o,end:o+b,level:f*s,pri:n.pri,V:g,nodes:y};return this.voices.push(x),this.last[e]={t:o,level:f*s},{name:e,stop:()=>this._steal(x)}}_steal(e){let t=this.voices.indexOf(e);if(t<0)return;this.voices.splice(t,1);let n=this.ctx.currentTime;for(let t of[e.V.out,e.V.echo])t&&(t.gain.cancelScheduledValues(n),t.gain.setValueAtTime(t.gain.value,n),t.gain.setTargetAtTime(0,n,.012));for(let t of e.V.srcs)try{t.stop(n+.08)}catch{}this.offline||setTimeout(()=>{for(let t of e.nodes)t.disconnect()},200)}_prune(e=this.ctx.currentTime){let t=this.ctx.currentTime;for(let n=this.voices.length-1;n>=0;n--){let r=this.voices[n];if(r.end<=e){if(this.voices.splice(n,1),!this.offline&&r.end<=t)for(let e of r.nodes)e.disconnect();else this.offline||setTimeout(()=>{for(let e of r.nodes)e.disconnect()},(r.end-t)*1e3+100)}}}stinger(e){let t=e_[e];if(!t)return this.warned.has(`s:`+e)||(this.warned.add(`s:`+e),console.warn(`[audio] unknown stinger "${e}"`)),!1;let n=this.ctx.currentTime;if(this.stingers=this.stingers.filter(e=>e.end>n),this.stingers.some(t=>t.name===e&&n-t.start<.8))return!1;let r=s_[e]||1;if(this.stingers.length>=2){let e=this.stingers.reduce((e,t)=>e.pri<=t.pri?e:t);if(e.pri>=r)return!1;e.out.gain.setTargetAtTime(0,n,.08),e.wet.gain.setTargetAtTime(0,n,.08),this.stingers.splice(this.stingers.indexOf(e),1)}let i=n+.02,a=this.k.gain(1,this.stingerIn),o=this.k.gain(1,this.stingerWet),s=t(this.k,a,o,i),c=this.musicIn.gain;return c.cancelScheduledValues(i),c.setTargetAtTime(.35,i,.12),c.setTargetAtTime(1,i+s*.7,.9),this.stingers.push({name:e,pri:r,start:i,end:i+s,out:a,wet:o}),!0}setVolume({master:e,music:t,sfx:n}={}){let r=this.ctx.currentTime;Number.isFinite(e)&&this.masterVol.gain.setTargetAtTime(dg(e),r,.03),Number.isFinite(t)&&this.musicVol.gain.setTargetAtTime(dg(t),r,.03),Number.isFinite(n)&&this.sfxVol.gain.setTargetAtTime(dg(n),r,.03)}setMuted(e){this.mute.gain.setTargetAtTime(+!e,this.ctx.currentTime,.04)}_slowTick(){try{let e=this.ctx.currentTime;this._prune(e),this.ambience.update(e),this.swarm.update(e)}catch(e){console.warn(`[audio] tick`,e)}this.tickTimer=setTimeout(()=>this._slowTick(),250)}meter(){this.analyser||(this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=2048,this.out.connect(this.analyser),this.meterBuf=new Float32Array(this.analyser.fftSize)),this.analyser.getFloatTimeDomainData(this.meterBuf);let e=0,t=0;for(let n of this.meterBuf){let r=Math.abs(n);r>e&&(e=r),t+=n*n}let n=Math.sqrt(t/this.meterBuf.length);return{peak:e,peakDb:20*Math.log10(e+1e-9),rmsDb:20*Math.log10(n+1e-9)}}},u_=new class{constructor(){this.eng=null,this.failed=!1,this._vol={master:.8,music:.6,sfx:.9},this._muted=!1,this._L={x:0,z:0,zoom:a_},this._intensity=0,this._swarm=0,this._wantMusic=!1,this._wantAmb=!1}get ready(){return!!this.eng}get context(){return this.eng?this.eng.ctx:null}init(){if(this.eng)return this._resume(),!0;if(this.failed)return!1;try{let e=typeof window<`u`?window:globalThis,t=e.AudioContext||e.webkitAudioContext;if(!t)throw Error(`Web Audio unavailable`);let n;try{n=new t({latencyHint:`interactive`})}catch{n=new t}this.eng=new l_(n),this.eng.setVolume(this._vol),this.eng.setMuted(this._muted),this.eng.setListener(this._L.x,this._L.z,this._L.zoom),this.eng.music.setIntensity(this._intensity),this._swarm&&this.eng.swarm.set(this._swarm),this._wantAmb&&this.eng.ambience.start(),this._wantMusic&&this.eng.music.start(),this._resume();let r=()=>this._resume();for(let t of[`pointerdown`,`keydown`,`touchend`])e.addEventListener?.(t,r,{passive:!0});return!0}catch(e){return this.failed=!0,this.eng=null,console.warn(`[audio] disabled:`,e&&e.message),!1}}_resume(){let e=this.eng&&this.eng.ctx;e&&e.state!==`running`&&e.state!==`closed`&&e.resume().catch(()=>{})}_safe(e,t=null){if(!this.eng)return t;try{return e(this.eng)}catch(e){return console.warn(`[audio]`,e),t}}setListener(e,t,n){Number.isFinite(e)&&(this._L.x=e),Number.isFinite(t)&&(this._L.z=t),Number.isFinite(n)&&(this._L.zoom=n),this.eng&&this.eng.setListener(e,t,n)}play(e,t){return this._safe(n=>n.play(e,t||{}))}startAmbience(){this._wantAmb=!0,this._safe(e=>e.ambience.start())}stopAmbience(e=2){this._wantAmb=!1,this._safe(t=>t.ambience.stop(e))}startMusic(){this._wantMusic=!0,this._safe(e=>e.music.start())}stopMusic(e=2){this._wantMusic=!1,this._safe(t=>t.music.stop(e))}setIntensity(e){this._intensity=dg(+e||0),this._safe(e=>e.music.setIntensity(this._intensity))}get intensity(){return this.eng?this.eng.music.I:this._intensity}setSwarm(e){this._swarm=dg(+e||0,0,200),this._safe(e=>e.swarm.set(this._swarm))}stinger(e){return this._safe(t=>t.stinger(e),!1)}setVolume(e={}){for(let t of[`master`,`music`,`sfx`])Number.isFinite(e[t])&&(this._vol[t]=dg(e[t]));this._safe(e=>e.setVolume(this._vol))}get volume(){return{...this._vol}}get muted(){return this._muted}set muted(e){this._muted=!!e,this._safe(e=>e.setMuted(this._muted))}stats(){return this._safe(e=>{let t={};for(let n of e.voices)t[n.name]=(t[n.name]||0)+1;return{state:e.ctx.state,voices:e.voices.length,byName:t,intensity:e.music.I,...e.meter()}},{state:`off`,voices:0,byName:{}})}},d_=2600,f_=(e,t)=>e+Math.random()*(t-e),p_=class{constructor(e,t,n,r){this.scene=e,this.fx=t,this.R=n,this.audio=r,this.k=0,this.target=0,this.boltT=3;let i=new Float32Array(d_*6);this.seed=new Float32Array(d_*3);for(let e=0;e<d_;e++)this.seed[e*3]=f_(-200,200),this.seed[e*3+1]=f_(0,120),this.seed[e*3+2]=f_(-200,200);let a=new Mr;a.setAttribute(`position`,new vr(i,3).setUsage(Ke)),this.rainGeo=a,this.rainMat=new yi({color:11188424,transparent:!0,opacity:0,depthWrite:!1,fog:!0}),this.rain=new ji(a,this.rainMat),this.rain.frustumCulled=!1,this.rain.renderOrder=8,e.add(this.rain),this.bolts=[]}set(e){this.target=+!!e}grade(e){let t=this.k;if(t<=.001)return;let n=e.uniforms,r=new V(.16,.19,.23);n.uZenith.value.lerp(new V(.05,.065,.085),t*.85),n.uHorizon.value.lerp(r,t*.8),n.uCloudLit.value.lerp(new V(.42,.45,.5),t*.8),n.uCloudDark.value.lerp(new V(.08,.09,.11),t*.8),n.uSunColor.value.multiplyScalar(1-t*.8),e.sun.intensity*=1-t*.8,e.hemi.intensity=.55+t*.1,e.hemi.color.lerp(new V(.45,.5,.58),t),e.fogColor.lerp(new V(.2,.23,.27),t*.85),this.scene.fog&&(this.scene.fog.color.copy(e.fogColor),this.scene.fog.density=42e-5+t*9e-4),e.exposure*=1-t*.06}update(e,t,n){this.k+=Math.sign(this.target-this.k)*Math.min(Math.abs(this.target-this.k),e/7);let r=this.k;if(ad.uWaveAmp.value=1+r*.75,ld.uCloudAmt.value=.5+r*.35,this.rainMat.opacity=r*.42,this.rain.visible=r>.01,this.rain.visible){let n=this.rainGeo.attributes.position.array,i=Math.floor(d_*Math.min(1,r*1.3));for(let a=0;a<d_;a++){let o=this.seed;o[a*3+1]-=150*e,o[a*3]+=18*e*.3,o[a*3+1]<0&&(o[a*3+1]+=120,o[a*3]=f_(-200,200),o[a*3+2]=f_(-200,200),a<60&&Math.random()<.5&&this.fx.decals.add(t.x+o[a*3],t.z+o[a*3+2],f_(1,2.4),.6,1,.35*r,2));let s=t.x+o[a*3],c=o[a*3+1],l=t.z+o[a*3+2],u=a*6;if(a>=i){n[u]=n[u+3]=1e5;continue}n[u]=s,n[u+1]=c,n[u+2]=l,n[u+3]=s-18*.035,n[u+4]=c+3.2,n[u+5]=l}this.rainGeo.attributes.position.needsUpdate=!0}r>.55&&(this.boltT-=e,this.boltT<=0&&(this.boltT=f_(2.5,7),this.strike(t.x+f_(-260,260),t.z+f_(-200,120))));for(let t=this.bolts.length-1;t>=0;t--){let n=this.bolts[t];n.t+=e,n.t>.08&&!n.second&&(n.second=!0,this.R.grade.uniforms.uFlash.value=Math.max(this.R.grade.uniforms.uFlash.value,.18)),n.t>1.4&&(this.bolts.splice(t,1),this.audio.play(`explosionBig`,{x:n.x,z:n.z,vol:.9,pitch:.45}))}}strike(e,t){let n=e+f_(-30,30),r=230,i=t+f_(-30,30);for(let a=0;a<9;a++){let o=(a+1)/9,s=e+(n-e)*(1-o)+f_(-10,10)*(1-o),c=230*(1-o),l=t+(i-t)*(1-o)+f_(-10,10)*(1-o);this.fx.beam(new B(n,r,i),new B(s,c,l),13162751,2.4,.28),a===4&&this.fx.beam(new B(s,c,l),new B(s+f_(-40,40),c-f_(20,50),l+f_(-40,40)),11584767,1.2,.2),n=s,r=c,i=l}this.fx.light(new B(e,40,t),12570879,160,420,.35),this.fx.splash(e,t,2.2),this.fx.ring(e,t,2,30,12570879,.5,.06),this.R.grade.uniforms.uFlash.value=.28,this.bolts.push({t:0,x:e,z:t})}},m_=new URLSearchParams(location.search),h_={difficulty:m_.get(`difficulty`)||g_(`aa.diff`)||`normal`,team:+(m_.get(`team`)??g_(`aa.team`)??0),quality:m_.get(`quality`)||g_(`aa.quality`)||`high`};function g_(e){try{return localStorage.getItem(e)}catch{return null}}function __(e,t){try{localStorage.setItem(e,t)}catch{}}var v_=e=>document.querySelector(e),y_=v_(`#loading .p i`),b_=v_(`#loading .s`),x_=async(e,t)=>{y_.style.width=e+`%`,b_.textContent=t,await new Promise(e=>setTimeout(e,16))};await x_(8,`Kindling the forge`);var S_=new Ju(v_(`#app`),h_.quality),C_=S_.scene;await x_(22,`Painting the sky`);var w_=new ed(S_.gl,C_);w_.setTime(Xu,0),w_.updateEnv(0,!0),await x_(40,`Raising the tides`);var T_=new hd(C_);await x_(58,`Charting the archipelago`),new zd(C_,Qd,$d);var E_=new Ud(C_),D_=new Jd(C_,E_,T_.decals,S_),O_=new cg(S_.camera);D_.onShake=(e,t,n)=>O_.addTrauma(e,t,n);var k_=new og(v_(`#ui`),v_(`#overlay`)),A_=new p_(C_,D_,S_,u_);await x_(76,`Compiling shaders`);var $=null,j_=`menu`,M_=null,N_={x:0,y:0,nx:0,ny:0,ground:new B,inside:!1},P_=new is,F_=new Ir(new B(0,1,0),0);function I_(e){if(M_&&C_.remove(M_),M_=new An,C_.add(M_),$=new Qh({renderer:S_,scene:M_,fx:D_,ocean:T_,audio:u_,ui:k_,sky:w_},{difficulty:h_.difficulty,playerTeam:h_.team,spectate:e,playerName:`You`,autopilot:!!m_.get(`autopilot`)}),k_.mount($),e){$.time=60,$.nextWave=0;for(let e of $.heroes)e.gold+=700;O_.orbit={a:0,r:210,h:95,cx:-120,cz:40,follow:()=>L_($)}}else{O_.orbit=null;let e=$.player;O_.snapTo(e.x,e.z),O_.startIntro(new B(0,0,0),new B(e.x,0,e.z)),O_.locked=!0,O_.distGoal=O_.dist=165,u_.stinger(`matchStart`),setTimeout(()=>k_.announce(`ARMADA ASCENSION`,`${pf[h_.team].name} · Destroy the enemy citadel`,pf[h_.team].css),1200),setTimeout(()=>k_.hint(`<kbd>Right-click</kbd> sail / attack &nbsp; <kbd>Q</kbd><kbd>W</kbd><kbd>E</kbd><kbd>R</kbd> abilities at cursor &nbsp; <kbd>T</kbd> advance age`,9e3),4800)}}function L_(e){let t=null,n=-1;for(let r of e.heroes){if(!r.alive)continue;let i=0;for(let t of e.heroes)t.alive&&t.team!==r.team&&r.dist(t)<120&&i++;i>n&&(n=i,t=r)}return t}function R_(){j_=`menu`,v_(`#menu`).classList.remove(`hidden`),v_(`#ui`).classList.add(`menuMode`),I_(!0),document.querySelectorAll(`#ui > *:not(#modalRoot)`).forEach(e=>e.classList.add(`hidden`)),u_.startAmbience(),u_.startMusic()}function z_(){u_.init(),j_=`play`,v_(`#menu`).classList.add(`hidden`),v_(`#ui`).classList.remove(`menuMode`),I_(!1)}function B_(e,t,n,r){let i=v_(e);i.querySelectorAll(`button`).forEach(e=>{e.classList.toggle(`on`,e.dataset.v===String(n)),e.onclick=()=>{u_.init(),u_.play(`uiClick`),i.querySelectorAll(`button`).forEach(e=>e.classList.remove(`on`)),e.classList.add(`on`),__(t,e.dataset.v),r(e.dataset.v)},e.onmouseenter=()=>u_.play(`uiHover`)})}B_(`#segDiff`,`aa.diff`,h_.difficulty,e=>h_.difficulty=e),B_(`#segTeam`,`aa.team`,h_.team,e=>h_.team=+e),B_(`#segQual`,`aa.quality`,h_.quality,e=>{h_.quality=e,location.search=`?quality=${e}`}),v_(`#playBtn`).onclick=()=>{u_.init(),u_.play(`uiClick`),z_()},v_(`#helpBtn`).onclick=()=>{u_.init(),u_.play(`uiClick`),v_(`#help`).classList.toggle(`hidden`)},k_.on(`again`,()=>z_()),k_.on(`menu`,()=>{k_.closeModal(),R_()});function V_(){let e=$&&$.player;if(!e||!e.canAgeUp())return;if(e.gold<e.nextAgeCost()){u_.play(`uiError`),k_.hint(`Need <b>${e.nextAgeCost()-Math.floor(e.gold)}</b> more gold for the ${hf[e.age].name}`,2e3);return}let t=gf[e.age+1];t.length===1?$.ageUp(e,t[0]):k_.openAgeChoice(t,t=>{$.ageUp(e,t),u_.play(`uiClick`)})}function H_(e){let t=$&&$.player;if(t&&t.alive&&!Bh($,t,e,N_.ground.x,N_.ground.z)){let n=t.abilities[e];n.minLevel&&t.level<n.minLevel&&k_.hint(`${n.name} unlocks at level ${n.minLevel}`,1500),u_.play(`uiError`)}}k_.on(`ageUp`,V_),k_.on(`buy`,e=>{$&&$.player&&!$.buyUpgrade($.player,e)&&u_.play(`uiError`)}),k_.on(`castButton`,e=>H_(e)),k_.on(`minimapLook`,(e,t)=>{O_.locked=!1,O_.goal.set(e,0,t)}),k_.on(`minimapMove`,(e,t)=>{$&&$.player&&$.player.alive&&($.player.commandMove(e,t),U_(e,t))});function U_(e,t,n=!1){D_.ring(e,t,1,7,n?16732224:10354608,.45,.2),T_.decals.add(e,t,4,.8,1,.7,2)}function W_(e,t,n){let r=null,i=1/0;for(let a of $.units){if(!a.alive||n!==void 0&&a.team===n)continue;let o=Math.hypot(a.x-e,a.z-t);o<a.radius+7&&o<i&&(i=o,r=a)}return r}var G_=S_.gl.domElement;G_.addEventListener(`contextmenu`,e=>e.preventDefault()),G_.addEventListener(`pointermove`,e=>{N_.x=e.clientX,N_.y=e.clientY,O_.mouse.x=e.clientX/window.innerWidth,O_.mouse.y=e.clientY/window.innerHeight,O_.mouse.inside=!0}),document.addEventListener(`pointerleave`,()=>O_.mouse.inside=!1),G_.addEventListener(`pointerdown`,e=>{if(u_.init(),j_!==`play`||!$||!$.player||$.over)return;let t=$.player;if(e.button===2&&t.alive){let e=W_(N_.ground.x,N_.ground.z,t.team);e?(t.commandAttack(e),U_(e.x,e.z,!0)):(t.commandMove(N_.ground.x,N_.ground.z),U_(N_.ground.x,N_.ground.z))}}),G_.addEventListener(`wheel`,e=>{O_.zoom(e.deltaY),e.preventDefault()},{passive:!1}),window.addEventListener(`keydown`,e=>{if(O_.keys[e.key]=!0,j_!==`play`||!$)return;let t=e.key.toLowerCase();if(e.ctrlKey&&/^[1-5]$/.test(e.key)){e.preventDefault(),k_.handlers.buy(yf[e.key-1].id);return}if(k_.modalOpen&&t===`escape`){k_.closeModal();return}if(e.repeat)return;let n=[`q`,`w`,`e`,`r`].indexOf(t);if(n>=0){H_(n);return}t===`t`||t===`u`?V_():t===`s`?$.player&&$.player.stop():t===` `?(O_.locked=!0,e.preventDefault()):t===`y`?O_.locked=!O_.locked:t===`tab`?(e.preventDefault(),k_.toggleScoreboard(!0)):t===`alt`?(k_.showRange=!0,e.preventDefault()):t===`m`&&(u_.muted=!u_.muted)}),window.addEventListener(`keyup`,e=>{O_.keys[e.key]=!1,e.key===`Tab`&&k_.toggleScoreboard(!1),e.key===`Alt`&&(k_.showRange=!1)}),window.addEventListener(`blur`,()=>{O_.keys={}});var K_=performance.now(),q_=0,J_=0,Y_=0,X_=60,Z_=new V;window.__aa={get G(){return $},R:S_,sky:w_,cameraDir:O_,fx:D_,settings:h_,get fps(){return X_}};function Q_(){requestAnimationFrame(Q_);let e=performance.now(),t=Math.min((e-K_)/1e3,.1);if(K_=e,!window.__aa.paused){S_.adapt(t);try{$_(t,!0)}catch(e){console.error(`frame error`,e&&e.stack||e)}}}window.__aa.castAt=e=>{let t=$&&$.player;if(!t)return!1;let n=$.heroes.filter(e=>e.alive&&e.team!==t.team).sort((e,n)=>t.dist2(e)-t.dist2(n))[0];return t.cds[e]=0,n?Bh($,t,e,n.x,n.z):!1},window.__aa.step=(e=1,t=1/30)=>{for(let n=0;n<e;n++)$_(t,n===e-1)};function $_(e,t){q_+=e,J_+=e,Y_++,J_>1&&(X_=Y_/J_,J_=0,Y_=0),$&&$.update(e);let n=$?$.dt:e,r=$?$.time:q_,i=$&&$.player;O_.update(e,i&&i.alive?i:null);let a=O_.focus;$&&($.listener.x=a.x,$.listener.z=a.z),u_.setListener(a.x,a.z,O_.dist);let o=j_===`play`&&$?$.time/mf.duration:Xu;w_.setTime(o,q_),A_.set(j_===`play`&&$&&$.storm>0),A_.update(e,a,S_.camera),A_.grade(w_),w_.follow(a.x,a.z),w_.updateEnv(e),w_.dome.position.copy(S_.camera.position),S_.gl.toneMappingExposure=w_.exposure,S_.setSun(w_.sunDir,w_.sun.color,j_===`menu`?1.2:.7),Z_.copy(w_.sun.color).multiplyScalar(w_.sun.intensity*.28).add(w_.hemi.color.clone().multiplyScalar(.55)),E_.setLight(Z_),E_.setScale(S_),ld.uCloudT.value=q_,T_.update(n,r,a.x,a.z,w_),D_.update(n,r),E_.update(n);let s=new z(N_.x/window.innerWidth*2-1,-(N_.y/window.innerHeight)*2+1);P_.setFromCamera(s,S_.camera),P_.ray.intersectPlane(F_,N_.ground);let c=S_.grade.uniforms;if(i){let t=i.alive?i.hp/i.maxHp:0;c.uDamage.value+=((t<.3&&i.alive?(.3-t)*2.5+Math.sin(q_*6)*.08:0)-c.uDamage.value)*Math.min(1,e*4),c.uDesat.value+=((i.alive?0:.85)-c.uDesat.value)*Math.min(1,e*2)}else c.uDamage.value=0,c.uDesat.value=0;if($){let e=0;for(let t of $.heroes)t.alive&&Math.hypot(t.x-a.x,t.z-a.z)<200&&t.target&&t.target.kind===`hero`&&(e+=.25);$.combatHeat=Math.min(1,Math.max($.combatHeat,e)),u_.setIntensity(j_===`menu`?.35:$.combatHeat)}t&&($&&j_===`play`&&k_.update($,S_.camera,n,O_.focus,O_.view),S_.render(e,q_))}await x_(92,`Mustering the fleets`),R_(),S_.render(.016,0),await x_(100,`Set sail`),v_(`#loading`).style.opacity=`0`,setTimeout(()=>v_(`#loading`).remove(),900),m_.get(`autoplay`)&&z_(),requestAnimationFrame(Q_);