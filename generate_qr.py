#!/usr/bin/env python3
import qrcode
import os
import json

def generate_qr_code(url, filename, output_dir="output"):
    """生成二维码并保存到指定目录"""
    
    # 确保输出目录存在
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # 创建二维码实例
    qr = qrcode.QRCode(
        version=1,  # 控制二维码的大小，1是最小的
        error_correction=qrcode.constants.ERROR_CORRECT_L,  # 错误纠正级别
        box_size=10,  # 每个小方块的像素数
        border=4,  # 边框的宽度
    )
    
    # 添加数据
    qr.add_data(url)
    qr.make(fit=True)
    
    # 创建二维码图像
    img = qr.make_image(fill_color="black", back_color="white")
    
    # 保存图像
    output_path = os.path.join(output_dir, f"{filename}.png")
    img.save(output_path)
    
    return output_path

def generate_batch_qr_codes(json_file_path, base_url="https://cursor.gkirito.com/?key=", output_dir="output"):
    """批量生成二维码"""
    
    # 读取JSON映射文件
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"错误：找不到文件 {json_file_path}")
        return
    except json.JSONDecodeError:
        print(f"错误：无法解析JSON文件 {json_file_path}")
        return
    
    mappings = data.get('mappings', {})
    if not mappings:
        print("错误：JSON文件中没有找到mappings字段")
        return
    
    print(f"开始生成 {len(mappings)} 个二维码...")
    
    success_count = 0
    error_count = 0
    
    for coin_id, key_value in mappings.items():
        try:
            # 构建完整的URL
            url = f"{base_url}{key_value}"
            
            # 生成二维码
            output_path = generate_qr_code(url, coin_id, output_dir)
            success_count += 1
            
            if success_count % 50 == 0:  # 每50个显示一次进度
                print(f"已生成 {success_count}/{len(mappings)} 个二维码...")
                
        except Exception as e:
            print(f"生成二维码 {coin_id} 时出错: {e}")
            error_count += 1
    
    print(f"\n批量生成完成！")
    print(f"成功生成: {success_count} 个")
    print(f"失败: {error_count} 个")
    print(f"输出目录: {output_dir}")

if __name__ == "__main__":
    # 批量生成二维码
    json_file_path = "src/data/encryption-map-001-500.json"
    
    try:
        generate_batch_qr_codes(json_file_path)
    except ImportError:
        print("qrcode库未安装，请运行: pip install qrcode[pil]")
    except Exception as e:
        print(f"生成二维码时出错: {e}")