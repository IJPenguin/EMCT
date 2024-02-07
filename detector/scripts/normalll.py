import os
import cv2

def get_image_dimensions(image_path):
    try:
        # Read the image using OpenCV
        image = cv2.imread(image_path)
        if image is None:
            print(f"Failed to read image at path: {image_path}")
            return None, None  # Return None for both dimensions if image reading fails
        
        # Get image dimensions
        height, width, _ = image.shape
        return width, height
    except Exception as e:
        print(f"Error occurred while reading image dimensions for {image_path}: {str(e)}")
        return None, None

def normalize_bbox_coordinates(annotation_file, image_width, image_height):
    # Read image dimensions
    width, height = get_image_dimensions(annotation_file[:-3] + "jpg")  # Assuming image extension is jpg
    if width is None or height is None:
        print(f"Failed to read image dimensions for {annotation_file}")
        return

    with open(annotation_file, 'r') as f:
        lines = f.readlines()

    normalized_lines = []
    for line in lines:
        # Split the line into components
        components = line.strip().split()
        
        # Extract bounding box coordinates
        class_label = components[0]
        x_center = float(components[1])
        y_center = float(components[2])
        box_width = float(components[3])
        box_height = float(components[4])
        
        # Calculate normalized coordinates
        normalized_x_center = x_center / width
        normalized_y_center = y_center / height
        normalized_box_width = box_width / width
        normalized_box_height = box_height / height
        
        # Calculate normalized bounding box coordinates
        normalized_x_min = normalized_x_center - normalized_box_width / 2 
        normalized_y_min = normalized_y_center - normalized_box_height / 2
        normalized_x_max = normalized_x_center + normalized_box_width / 2
        normalized_y_max = normalized_y_center + normalized_box_height / 2
        
        # Append normalized coordinates to the list
        normalized_line = f"{class_label} {normalized_x_min} {normalized_y_min} {normalized_x_max} {normalized_y_max}\n"
        normalized_lines.append(normalized_line)

    # Write the normalized coordinates back to the annotation file
    with open(annotation_file, 'w') as f:
        f.writelines(normalized_lines)

def normalize_labels_in_folder(folder_path):
    for root, _, files in os.walk(folder_path):
        for file_name in files:
            if file_name.endswith('.txt'):
                annotation_file = os.path.join(root, file_name)
                width, height = get_image_dimensions(annotation_file[:-3] + "jpg")
                if width is not None and height is not None:
                    normalize_bbox_coordinates(annotation_file, width, height)


# Example usage:
folder_path = 'C:/Users/agniv/OneDrive/Desktop/convert/labels2/train/Axe'

normalize_labels_in_folder(folder_path)
print("Normalization complete.")
