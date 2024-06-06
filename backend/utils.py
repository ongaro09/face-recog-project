import cv2
import numpy as np
import os

def verify_user_image(reference_image_path, captured_image_path):
    reference_image = cv2.imread(reference_image_path)
    captured_image = cv2.imread(captured_image_path)

    if reference_image is None or captured_image is None:
        return False

    # Convert images to grayscale
    reference_gray = cv2.cvtColor(reference_image, cv2.COLOR_BGR2GRAY)
    captured_gray = cv2.cvtColor(captured_image, cv2.COLOR_BGR2GRAY)

    # Use ORB detector to find keypoints and descriptors
    orb = cv2.ORB_create()
    kp1, des1 = orb.detectAndCompute(reference_gray, None)
    kp2, des2 = orb.detectAndCompute(captured_gray, None)

    # Match descriptors using BFMatcher
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(des1, des2)

    # Sort matches by distance
    matches = sorted(matches, key=lambda x: x.distance)

    # Check if enough matches are found
    good_matches = [m for m in matches if m.distance < 50]
    match_ratio = len(good_matches) / len(matches)

    return match_ratio > 0.1 