// 设置精度
precision mediump float;

// 接收公共值
varying vec2 vUv;

// 设置变量
float color;

void main() {

  // 利用uv实现渐变效果, 从左到右
  // color = vUv.x;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用uv实现渐变效果, 从右到左
  // color = 1.0 - vUv.x;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用uv实现渐变效果, 从上到下
  // color = vUv.y;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用uv实现渐变效果, 从下到上
  // color = 1.0 - vUv.y;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用uv实现渐变效果, 实现短范围的渐变
  // color = vUv.y * 10.0;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 通过mod()取模(求余)实现段范围渐变效果
  color = mod(vUv.y * 10.0, 1.0);
  gl_FragColor = vec4(color, color, color, 1.0);
}
