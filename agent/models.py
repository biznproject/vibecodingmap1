from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class AimCheck(BaseModel):
    core_purpose: str = Field(description="프로젝트의 핵심 목표 및 가치")
    target_audience: str = Field(description="타깃 사용자 페르소나")
    design_system: str = Field(default="Bauhaus Functional Minimalist", description="디자인 테마 및 시각 철학")

class LogicCheck(BaseModel):
    tech_stack: List[str] = Field(description="사용할 기술 스택 목록")
    primary_features: List[str] = Field(description="핵심 기능 리스트")
    critical_rules: List[str] = Field(description="코딩 시 AI 및 개발자가 준수해야 할 필수 제약사항")
    directory_structure: str = Field(description="권장 프로젝트 디렉터리 트리")

class ValidationCheck(BaseModel):
    done_criteria: str = Field(description="완료 정의 (Definition of Done)")
    test_cases: List[str] = Field(description="필수 E2E 및 단위 테스트 케이스")
    performance_targets: Dict[str, str] = Field(default_factory=lambda: {"lcp": "< 1.2s", "cls": "0.0"}, description="품질 및 성능 척도")

class FullProjectSpecification(BaseModel):
    project_title: str = Field(description="프로젝트 공식 명칭")
    version: str = Field(default="1.0.0", description="명세서 버전")
    aim: AimCheck
    logic: LogicCheck
    validation: ValidationCheck
    purchased_x402_blueprint: Optional[Dict[str, Any]] = Field(default=None, description="x402 프로토콜을 통해 구매한 검증된 외부 명세서 원본")