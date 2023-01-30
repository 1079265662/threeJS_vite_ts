// 设置精度
precision mediump float;

// 接收公共值
varying vec2 vUv;

void main() {
  // 设置片元颜色 r红 g绿 b蓝 a透明度
  gl_FragColor = vec4(1, 1, 1.0, 1.0); // 每个颜色加点颜色
  // 或者直接设置
  // gl_FragColor = vec4(vUv, 1.0, 1.0);
}
