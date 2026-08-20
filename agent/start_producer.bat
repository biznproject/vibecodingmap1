@echo off
title VibeCoding Autonomous Spec Producer (Background)
echo =======================================================
echo  Starting VibeCodingMap Autonomous Spec Factory
echo =======================================================
python agent\autonomous_producer.py --batch
pause