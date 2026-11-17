;; Partikel-Advection (Text-Entsprechung zu field.wasm)
;; (module
;;   (memory 2)
;;   (func (export "advance") (param $count i32) (param $dt f32) (param $W f32) (param $H f32)
;;     (local $i i32) (local $nx f32) (local $ny f32)
;;     ... loop over count ...
;;     px[i]=x[i]  py[i]=y[i]
;;     nx=x[i]+vx[i]*dt*1.7   ny=y[i]+vy[i]*dt*1.7
;;     wrap at -20 and W/H+20
;;     x[i]=nx     y[i]=ny
;;   )
;; )
;; Adressen: X=0 Y=1024 PX=2048 PY=3072 VX=4096 VY=5120
