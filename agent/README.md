# VibeCodingMap Autonomous Local Agent (Phi-3.5 + Pydantic AI)

로컬에서 **Phi-3.5 (SLM)** 및 **Pydantic AI**로 가동되며, **x402 프로토콜**을 통해 VibeCodingMap의 검증된 아키텍처 명세서를 자율 탐색·구매하는 에이전트 시스템입니다.

## 🚀 빠른 시작 (Quickstart)

### 1. Python 패키지 설치
```bash
pip install -r requirements.txt
```

### 2. 로컬 Phi-3.5 모델 실행 (Ollama)
```bash
ollama run phi3.5:latest
```

### 3. 에이전트 실행 및 명세서 생성
```bash
python spec_director.py
```

### 4. E2E 자율 결제 시뮬레이션 테스트
```bash
python test_x402_agent.py
```

### 5. Cursor / Claude Desktop용 MCP 서버 실행
```bash
python mcp_server.py
```