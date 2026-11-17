;; Virtueller Feldgenerator — WebAssembly-Assembler (WAT).
;; Kompiliert mit wat2wasm zu field.wasm. Keine Imports.
;; Speicher (f32): X=0 Y=1024 PX=2048 PY=3072 VX=4096 VY=5120 BALL=6144
(module
  (memory 2)
  (export "mem" (memory 0))

  ;; Partikel-Advection mit Rand-Wrap.
  (func (export "advance") (param $count i32) (param $dt f32) (param $W f32) (param $H f32)
    (local $i i32) (local $nx f32) (local $ny f32) (local $p i32)
    (block $done
      (loop $loop
        (br_if $done (i32.ge_s (local.get $i) (local.get $count)))
        (local.set $p (i32.mul (local.get $i) (i32.const 4)))

        ;; px[i] = x[i]
        (f32.store (i32.add (local.get $p) (i32.const 2048))
          (f32.load (i32.add (local.get $p) (i32.const 0))))
        ;; py[i] = y[i]
        (f32.store (i32.add (local.get $p) (i32.const 3072))
          (f32.load (i32.add (local.get $p) (i32.const 1024))))

        ;; nx = x + vx * dt * 1.7
        (local.set $nx
          (f32.add
            (f32.load (i32.add (local.get $p) (i32.const 0)))
            (f32.mul
              (f32.mul (f32.load (i32.add (local.get $p) (i32.const 4096))) (local.get $dt))
              (f32.const 1.7))))
        ;; ny = y + vy * dt * 1.7
        (local.set $ny
          (f32.add
            (f32.load (i32.add (local.get $p) (i32.const 1024)))
            (f32.mul
              (f32.mul (f32.load (i32.add (local.get $p) (i32.const 5120))) (local.get $dt))
              (f32.const 1.7))))

        ;; Wrap x
        (if (f32.lt (local.get $nx) (f32.const -20))
          (then (local.set $nx (f32.add (local.get $W) (f32.const 20)))))
        (if (f32.gt (local.get $nx) (f32.add (local.get $W) (f32.const 20)))
          (then (local.set $nx (f32.const -20))))
        ;; Wrap y
        (if (f32.lt (local.get $ny) (f32.const -20))
          (then (local.set $ny (f32.add (local.get $H) (f32.const 20)))))
        (if (f32.gt (local.get $ny) (f32.add (local.get $H) (f32.const 20)))
          (then (local.set $ny (f32.const -20))))

        (f32.store (i32.add (local.get $p) (i32.const 0)) (local.get $nx))
        (f32.store (i32.add (local.get $p) (i32.const 1024)) (local.get $ny))

        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br $loop)
      )
    )
  )

  ;; Boing-Ball-Physik. BALL: y=6144, vy=6148, squash=6152.
  ;; Rueckgabe: 1 bei Aufprall, sonst 0.
  (func (export "bounce") (param $dt f32) (param $floor f32) (param $g f32) (param $r f32) (result i32)
    (local $y f32) (local $vy f32) (local $hit i32)
    (local.set $y  (f32.load (i32.const 6144)))
    (local.set $vy (f32.load (i32.const 6148)))
    (local.set $vy (f32.add (local.get $vy) (f32.mul (local.get $g) (local.get $dt))))
    (local.set $y  (f32.add (local.get $y) (f32.mul (local.get $vy) (local.get $dt))))

    (if (f32.ge (f32.add (local.get $y) (local.get $r)) (local.get $floor))
      (then
        (local.set $y (f32.sub (local.get $floor) (local.get $r)))
        (local.set $vy
          (f32.neg
            (f32.max (f32.const 3.2) (f32.mul (f32.abs (local.get $vy)) (f32.const 0.9)))))
        (f32.store (i32.const 6152) (f32.const 1))
        (local.set $hit (i32.const 1))))

    (f32.store (i32.const 6144) (local.get $y))
    (f32.store (i32.const 6148) (local.get $vy))
    (local.get $hit)
  )
)
