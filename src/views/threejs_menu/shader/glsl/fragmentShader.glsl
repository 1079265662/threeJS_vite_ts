// 设置精度
precision mediump float;

// 接收顶点着色器传递的值
varying vec2 vUv;
varying float vPositionZ;

// 导入three.js传来的纹理, sampler2D采样纹理对应的是THREE.Texture的纹理
uniform sampler2D uTexture;

// 声明浮点数的值
float color;
// 声明纹理颜色值
vec4 textureColor;

void main() {
  // z轴的值为-0.05~0.05，不能为负数所以加0.05转正，再乘以10，得到0~10的R色值, 让其颜色随着凹凸变化, 越凹越黑(值越小), 越凸越亮(值越大)
  color = vPositionZ + 0.05 * 20.0;
  // gl_FragColor = vec4(color, 0.0, 0.0, 1.0); // 赋值计算后R色值

  // 根据uv坐标获取纹理的颜色值
  textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= color;  // 赋值计算后的颜色值

 // 赋值计算后的颜色值
  gl_FragColor = textureColor;
}
