import RPi.GPIO as GPIO
import time, sys
from time import sleep

GPIO.setmode(GPIO.BOARD)
GPIO.setup(40, GPIO.OUT)
GPIO.output(40,GPIO.LOW)
