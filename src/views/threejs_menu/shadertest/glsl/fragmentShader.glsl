// 设置精度
precision mediump float;

// 接收公共值
varying vec2 vUv;
uniform float time;

// 设置变量
float color;

// 伪随机方法
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

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
  // color = mod(vUv.y * 10.0, 1.0);
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用step()步长, 如果x < edge，返回0.0，否则返回1.0
  // color = step(0.8, mod(vUv.x * 10.0, 1.0));
  // 如果color < 0.5, 返回0.0, 否则返回1.0
  // color += step(0.8, mod(vUv.y * 10.0, 1.0));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用step()步长,相减
  // color = step(0.8, mod(vUv.x * 10.0, 1.0));
  // 相减
  // color -= step(0.8, mod(vUv.y * 10.0, 1.0));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用step()步长,相加
  // color = step(0.8, mod(vUv.x * 10.0, 1.0));
  // color += step(0.8, mod(vUv.y * 10.0, 1.0));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用step()步长,相乘
  // color = step(0.2, mod(vUv.x * 10.0 + 0.01, 1.0));
  // color *= step(0.2, mod(vUv.y * 10.0 + 0.01, 1.0));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用绝对值abs()实现渐变效果
  // color = abs(vUv.x - 0.5);
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用绝对值abs()取最小值min()实现渐变效果
  // float color = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 取最大值
  // float color = 0.5 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 补偿和最大值效果
  // float color = 1.0 - step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 向下取整, 获得x轴条纹
  // float color = floor(vUv.x * 10.0) / 10.0;
  // gl_FragColor = vec4(color, color, color, 1);

  // 向下取整, XY轴条纹, 两者相乘
  // float color = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
  // gl_FragColor = vec4(color, color, color, 1);

  // 向上取整, XY轴条纹, 两者相乘
  // float color = ceil(vUv.x * 10.0) / 10.0 * ceil(vUv.y * 10.0) / 10.0;

// 随机数
  // 随机数
  float color = random(vUv + time);
  gl_FragColor = vec4(color, color, color, 1);
}
