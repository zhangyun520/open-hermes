//! Stable, low-cost pure Rust core for Cognitive Jelly.
//!
//! This crate keeps the deterministic safety, privacy, routing, digestion,
//! drift, and lifecycle rules independent from the TypeScript application
//! layer. It does not perform network calls, store secrets, write public cache,
//! or automate external actions.

use std::collections::{BTreeMap, BTreeSet};

/// Jellyfish-inspired organ labels used by the protocol layer.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum JellyOrganType {
    NerveNet,
    Tentacle,
    Cnidocyte,
    TransparentAudit,
    Bioluminescence,
    Digestor,
    DriftOptimizer,
    Lifecycle,
    SwarmCommons,
    PrivacyMembrane,
    PulseScheduler,
    RegenerativeRecovery,
}

/// Signal categories shared with the TypeScript application layer.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum JellySignalType {
    Wish,
    ReverseWish,
    Garbage,
    ResidualCard,
    SkillHit,
    CacheHit,
    Review,
    SafetyRisk,
    BiasAlert,
    HumanTransition,
    WorldExperience,
    ExternalConnector,
    VersionEvent,
}

/// Ordered risk levels. Higher variants represent stricter handling.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum JellyRiskLevel {
    Low,
    Medium,
    High,
    Critical,
}

/// Privacy layers ordered from narrowest to widest sharing boundary.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum JellyPrivacyLevel {
    Private,
    Team,
    Community,
    Public,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum JellySignalStatus {
    Received,
    Digesting,
    Routed,
    Blocked,
    NeedsReview,
    Cached,
    Glowing,
    Quarantined,
    Regenerating,
    Completed,
}

/// Minimal metadata value type so the core stays dependency-free and cheap.
#[derive(Debug, Clone, PartialEq)]
pub enum MetadataValue {
    Bool(bool),
    Number(f64),
    Text(String),
}

impl MetadataValue {
    fn as_bool(&self) -> Option<bool> {
        match self {
            Self::Bool(value) => Some(*value),
            _ => None,
        }
    }

    fn as_f64(&self) -> Option<f64> {
        match self {
            Self::Number(value) => Some(*value),
            Self::Text(value) => value.parse::<f64>().ok(),
            Self::Bool(_) => None,
        }
    }

    fn as_text(&self) -> String {
        match self {
            Self::Bool(value) => value.to_string(),
            Self::Number(value) => value.to_string(),
            Self::Text(value) => value.clone(),
        }
    }
}

impl From<bool> for MetadataValue {
    fn from(value: bool) -> Self {
        Self::Bool(value)
    }
}

impl From<f64> for MetadataValue {
    fn from(value: f64) -> Self {
        Self::Number(value)
    }
}

impl From<u32> for MetadataValue {
    fn from(value: u32) -> Self {
        Self::Number(f64::from(value))
    }
}

impl From<&str> for MetadataValue {
    fn from(value: &str) -> Self {
        Self::Text(value.to_owned())
    }
}

impl From<String> for MetadataValue {
    fn from(value: String) -> Self {
        Self::Text(value)
    }
}

pub type Metadata = BTreeMap<String, MetadataValue>;

#[derive(Debug, Clone, PartialEq)]
pub struct JellySignal {
    pub id: String,
    pub signal_type: JellySignalType,
    pub source_module: String,
    pub target_module: Option<String>,
    pub summary: String,
    pub payload_ref: Option<String>,
    pub privacy_level: JellyPrivacyLevel,
    pub risk_level: JellyRiskLevel,
    pub status: JellySignalStatus,
    pub created_at: String,
    pub metadata: Metadata,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum RequiredAction {
    Redact,
    HumanReview,
    Quarantine,
    ConsentRequired,
    LicenseCheck,
    HumanTransitionReview,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct JellySafetyDecision {
    pub signal_id: String,
    pub allowed: bool,
    pub risk_level: JellyRiskLevel,
    pub reasons: Vec<String>,
    pub required_actions: Vec<RequiredAction>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct JellyRouteDecision {
    pub signal_id: String,
    pub route_to: Vec<String>,
    pub blocked_by: Vec<String>,
    pub requires_human_review: bool,
    pub use_cache_first: bool,
    pub use_local_only: bool,
    pub reason: String,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum WasteClass {
    Recyclable,
    Harmful,
    Compostable,
    Slag,
    ReviewRequired,
}

#[derive(Debug, Clone, PartialEq)]
pub struct ResidualCardCandidate {
    pub title: String,
    pub domain: String,
    pub current_d: f64,
    pub target_d: f64,
    pub verification_metric: String,
    pub reusable: bool,
}

#[derive(Debug, Clone, PartialEq)]
pub struct JellyDigestResult {
    pub signal_id: String,
    pub residual_card_candidate: Option<ResidualCardCandidate>,
    pub waste_class: WasteClass,
    pub notes: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PrivacyMembraneDecision {
    pub allowed: bool,
    pub reason: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PrivacyMembraneInput {
    pub from: JellyPrivacyLevel,
    pub to: JellyPrivacyLevel,
    pub privacy_level: JellyPrivacyLevel,
    pub risk_level: JellyRiskLevel,
    pub has_consent: bool,
    pub is_redacted: bool,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DriftDecision {
    pub use_cache_first: bool,
    pub use_local_first: bool,
    pub use_cheap_model_first: bool,
    pub escalate_to_strong_model: bool,
    pub reason: String,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum LifecycleObjectType {
    Idea,
    Skill,
    Residual,
    Version,
    CacheObject,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum LifecycleStage {
    Polyp,
    Ephyra,
    Medusa,
    Bloom,
    Dormant,
    Frozen,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LifecycleInput {
    pub object_id: String,
    pub object_type: LifecycleObjectType,
    pub usage_count: u32,
    pub review_score: u32,
    pub verification_score: u32,
    pub risk_level: JellyRiskLevel,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct JellyLifecycleState {
    pub object_id: String,
    pub object_type: LifecycleObjectType,
    pub stage: LifecycleStage,
    pub maturity_score: u32,
    pub next_possible_stages: Vec<LifecycleStage>,
}

const SENSITIVE_KEYS: [&str; 7] = [
    "apiKey",
    "phone",
    "idCard",
    "licensePlate",
    "studentName",
    "policyNumber",
    "medicalRecord",
];

fn metadata_bool(metadata: &Metadata, key: &str) -> bool {
    metadata
        .get(key)
        .and_then(MetadataValue::as_bool)
        .unwrap_or(false)
}

fn metadata_number(metadata: &Metadata, key: &str, fallback: f64) -> f64 {
    metadata
        .get(key)
        .and_then(MetadataValue::as_f64)
        .unwrap_or(fallback)
}

fn metadata_text(metadata: &Metadata, key: &str, fallback: &str) -> String {
    metadata
        .get(key)
        .map(MetadataValue::as_text)
        .unwrap_or_else(|| fallback.to_owned())
}

fn metadata_blob(metadata: &Metadata) -> String {
    metadata
        .iter()
        .map(|(key, value)| format!("{key}:{}", value.as_text()))
        .collect::<Vec<_>>()
        .join(" ")
}

fn has_sensitive_metadata(signal: &JellySignal) -> bool {
    SENSITIVE_KEYS
        .iter()
        .any(|key| signal.metadata.contains_key(*key))
}

fn ordered_unique_actions(actions: Vec<RequiredAction>) -> Vec<RequiredAction> {
    let mut seen = BTreeSet::new();
    let mut deduped = Vec::new();
    for action in actions {
        if seen.insert(action) {
            deduped.push(action);
        }
    }
    deduped
}

fn ordered_unique_reasons(reasons: Vec<String>) -> Vec<String> {
    let mut seen = BTreeSet::new();
    let mut deduped = Vec::new();
    for reason in reasons {
        if seen.insert(reason.clone()) {
            deduped.push(reason);
        }
    }
    deduped
}

/// Compute C from D using the project invariant C + D = 1.
pub fn closure_from_residual_d(residual_d: f64) -> f64 {
    1.0 - residual_d.clamp(0.0, 1.0)
}

/// Compute D from C using the project invariant C + D = 1.
pub fn residual_d_from_closure(closure_c: f64) -> f64 {
    1.0 - closure_c.clamp(0.0, 1.0)
}

/// CnidocyteSafetyGate: block or review privacy, abuse, cheating, IP/persona,
/// risky external write, and human-transition hazards.
pub fn evaluate_jelly_safety(signal: &JellySignal) -> JellySafetyDecision {
    let mut reasons = Vec::new();
    let mut actions = Vec::new();
    let mut risk_level = signal.risk_level;
    let mut allowed = true;

    let target_layer = metadata_text(&signal.metadata, "targetLayer", "");
    let target = format!(
        "{} {}",
        signal.target_module.as_deref().unwrap_or_default(),
        target_layer
    )
    .to_lowercase();

    if signal.privacy_level == JellyPrivacyLevel::Private
        && (target.contains("public") || target.contains("community"))
    {
        reasons.push(
            "private signal cannot move to public/community without redaction and review"
                .to_owned(),
        );
        actions.extend([RequiredAction::Redact, RequiredAction::HumanReview]);
        risk_level = risk_level.max(JellyRiskLevel::High);
        allowed = false;
    }

    match signal.risk_level {
        JellyRiskLevel::High => {
            reasons.push("high risk signal requires human review".to_owned());
            actions.push(RequiredAction::HumanReview);
        }
        JellyRiskLevel::Critical => {
            reasons.push("critical risk signal is blocked and quarantined".to_owned());
            actions.extend([RequiredAction::HumanReview, RequiredAction::Quarantine]);
            allowed = false;
        }
        JellyRiskLevel::Low | JellyRiskLevel::Medium => {}
    }

    if has_sensitive_metadata(signal) {
        reasons.push("sensitive metadata detected".to_owned());
        actions.extend([RequiredAction::Redact, RequiredAction::HumanReview]);
        risk_level = risk_level.max(JellyRiskLevel::High);
        allowed = false;
    }

    if signal.signal_type == JellySignalType::ExternalConnector
        && metadata_bool(&signal.metadata, "writeAction")
    {
        reasons.push("external write action requires consent and human approval".to_owned());
        actions.extend([RequiredAction::ConsentRequired, RequiredAction::HumanReview]);
        risk_level = risk_level.max(JellyRiskLevel::High);
    }

    let text = format!("{} {}", signal.summary, metadata_blob(&signal.metadata)).to_lowercase();
    if contains_any(
        &text,
        &[
            "cheat",
            "anti-cheat bypass",
            "anticheat bypass",
            "live multiplayer control",
            "外挂",
            "代练",
            "刷分",
        ],
    ) {
        reasons.push("cheat or anti-cheat bypass risk detected".to_owned());
        actions.extend([RequiredAction::Quarantine, RequiredAction::HumanReview]);
        risk_level = JellyRiskLevel::Critical;
        allowed = false;
    }

    if contains_any(
        &text,
        &[
            "unauthorized ip",
            "真人冒用",
            "impersonation",
            "copyright character",
        ],
    ) {
        reasons.push("unauthorized IP/persona risk detected".to_owned());
        actions.extend([RequiredAction::LicenseCheck, RequiredAction::HumanReview]);
        risk_level = risk_level.max(JellyRiskLevel::High);
        allowed = false;
    }

    if metadata_bool(&signal.metadata, "affectsHumanTransition") {
        reasons.push("automation may affect human transition".to_owned());
        actions.extend([
            RequiredAction::HumanTransitionReview,
            RequiredAction::HumanReview,
        ]);
        risk_level = risk_level.max(JellyRiskLevel::High);
    }

    JellySafetyDecision {
        signal_id: signal.id.clone(),
        allowed,
        risk_level,
        reasons: ordered_unique_reasons(reasons),
        required_actions: ordered_unique_actions(actions),
    }
}

/// NerveNetRouter: route without assuming a single central brain.
pub fn route_jelly_signal(signal: &JellySignal) -> JellyRouteDecision {
    let high_risk = matches!(
        signal.risk_level,
        JellyRiskLevel::High | JellyRiskLevel::Critical
    );
    let use_cache_first = matches!(
        signal.signal_type,
        JellySignalType::CacheHit | JellySignalType::SkillHit
    ) || metadata_bool(&signal.metadata, "cacheAvailable");
    let use_local_only = signal.privacy_level == JellyPrivacyLevel::Private;
    let mut reason = format!(
        "{:?} signal routed by distributed nerve net",
        signal.signal_type
    );
    if high_risk {
        reason.push_str("; high risk requires human review");
    }
    if use_local_only {
        reason.push_str("; private signal stays local");
    }

    JellyRouteDecision {
        signal_id: signal.id.clone(),
        route_to: base_routes(signal.signal_type)
            .iter()
            .map(|route| (*route).to_owned())
            .collect(),
        blocked_by: Vec::new(),
        requires_human_review: high_risk,
        use_cache_first,
        use_local_only,
        reason,
    }
}

/// ResidualDigestor: convert safe failure/material signals into residual card
/// candidates. Harmful or review-required material is not made reusable.
pub fn digest_residual_signal(signal: &JellySignal) -> JellyDigestResult {
    let mut notes = Vec::new();
    let mut waste_class = WasteClass::Recyclable;
    let category = metadata_text(&signal.metadata, "category", "").to_lowercase();
    let text = format!(
        "{} {} {}",
        signal.summary,
        category,
        metadata_blob(&signal.metadata)
    )
    .to_lowercase();

    if has_sensitive_metadata(signal) {
        waste_class = if matches!(
            signal.risk_level,
            JellyRiskLevel::High | JellyRiskLevel::Critical
        ) {
            WasteClass::Harmful
        } else {
            WasteClass::ReviewRequired
        };
        notes.push("sensitive fields require redaction before sharing".to_owned());
    } else if contains_any(&text, &["ai failure", "hallucination", "跑偏"]) {
        waste_class = WasteClass::Slag;
        notes.push(
            "AI failure can enter the failure museum and later be mined for taxonomy".to_owned(),
        );
    } else if contains_any(&text, &["creative", "idea fragment", "灵感"]) {
        waste_class = WasteClass::Compostable;
        notes.push(
            "creative fragment should compost into future prompts or world scenes".to_owned(),
        );
    } else if contains_any(
        &text,
        &[
            "work order",
            "student mistake",
            "错题",
            "工单",
            "high evidence",
        ],
    ) {
        waste_class = if metadata_number(&signal.metadata, "evidenceStrength", 0.0) >= 70.0 {
            WasteClass::Recyclable
        } else {
            WasteClass::Slag
        };
        notes
            .push("evidence determines whether this becomes reusable residual material".to_owned());
    } else if !matches!(
        signal.signal_type,
        JellySignalType::Garbage | JellySignalType::WorldExperience | JellySignalType::ReverseWish
    ) {
        waste_class = WasteClass::ReviewRequired;
        notes.push("non-digest signal requires review before residualization".to_owned());
    }

    let residual_value = metadata_number(
        &signal.metadata,
        "residualValue",
        match waste_class {
            WasteClass::Recyclable => 76.0,
            WasteClass::Compostable => 58.0,
            WasteClass::Harmful | WasteClass::Slag | WasteClass::ReviewRequired => 34.0,
        },
    );
    let current_d = (residual_value / 100.0).clamp(0.1, 0.95);
    let can_candidate = !matches!(
        waste_class,
        WasteClass::Harmful | WasteClass::ReviewRequired
    );
    let residual_card_candidate = can_candidate.then(|| ResidualCardCandidate {
        title: signal.summary.chars().take(60).collect(),
        domain: metadata_text(&signal.metadata, "domain", &signal.source_module),
        current_d,
        target_d: 0.2,
        verification_metric: metadata_text(
            &signal.metadata,
            "verificationMetric",
            "review accepted + future reuse",
        ),
        reusable: waste_class == WasteClass::Recyclable || current_d >= 0.55,
    });

    JellyDigestResult {
        signal_id: signal.id.clone(),
        residual_card_candidate,
        waste_class,
        notes,
    }
}

/// OsmoticPrivacyMembrane: allow only consented, redacted structures to widen
/// their layer; raw private data never enters public space.
pub fn can_cross_privacy_membrane(input: &PrivacyMembraneInput) -> PrivacyMembraneDecision {
    let upgrading = input.to > input.from;
    if !upgrading {
        return PrivacyMembraneDecision {
            allowed: true,
            reason: "same or lower privacy layer movement is allowed".to_owned(),
        };
    }
    if !input.has_consent {
        return PrivacyMembraneDecision {
            allowed: false,
            reason: "consent required before crossing to a wider layer".to_owned(),
        };
    }
    if input.privacy_level == JellyPrivacyLevel::Private && input.to == JellyPrivacyLevel::Public {
        return PrivacyMembraneDecision {
            allowed: false,
            reason: "private data cannot enter public layer".to_owned(),
        };
    }
    if matches!(
        input.to,
        JellyPrivacyLevel::Community | JellyPrivacyLevel::Public
    ) && !input.is_redacted
    {
        return PrivacyMembraneDecision {
            allowed: false,
            reason: "redaction required before community/public sharing".to_owned(),
        };
    }
    if input.risk_level == JellyRiskLevel::Critical && input.to == JellyPrivacyLevel::Public {
        return PrivacyMembraneDecision {
            allowed: false,
            reason: "critical risk can never enter public layer".to_owned(),
        };
    }
    PrivacyMembraneDecision {
        allowed: true,
        reason: "privacy membrane allows redacted, consented structure to cross".to_owned(),
    }
}

/// DriftOptimizer: choose cheaper/local/cache-first paths where safe, without
/// making model calls from this core crate.
pub fn optimize_jelly_drift(signal: &JellySignal) -> DriftDecision {
    if signal.risk_level == JellyRiskLevel::Critical {
        return DriftDecision {
            use_cache_first: false,
            use_local_first: true,
            use_cheap_model_first: false,
            escalate_to_strong_model: false,
            reason: "critical risk: no model call, route to human review".to_owned(),
        };
    }

    let use_local_first = signal.privacy_level == JellyPrivacyLevel::Private;
    let use_cache_first = matches!(
        signal.signal_type,
        JellySignalType::CacheHit | JellySignalType::SkillHit
    ) || metadata_bool(&signal.metadata, "cacheAvailable");
    let repetitive = metadata_bool(&signal.metadata, "repetitive")
        || contains_any(
            &signal.summary.to_lowercase(),
            &["repeat", "repetitive", "模板", "重复"],
        );
    let low_risk = signal.risk_level == JellyRiskLevel::Low;
    let high_value_low_confidence = metadata_number(&signal.metadata, "publicValue", 0.0) >= 80.0
        && metadata_number(&signal.metadata, "confidence", 100.0) < 55.0;

    let use_cheap_model_first = low_risk && repetitive && !high_value_low_confidence;
    let escalate_to_strong_model =
        high_value_low_confidence && signal.risk_level != JellyRiskLevel::High;

    let mut parts = Vec::new();
    if use_local_first {
        parts.push("private local-first");
    }
    if use_cache_first {
        parts.push("cache-first");
    }
    if low_risk && repetitive {
        parts.push("low-risk repetitive signal can use cheap model");
    }
    if high_value_low_confidence {
        parts.push("high public value with low confidence may need stronger model");
    }

    DriftDecision {
        use_cache_first,
        use_local_first,
        use_cheap_model_first,
        escalate_to_strong_model,
        reason: if parts.is_empty() {
            "normal drift path".to_owned()
        } else {
            format!("{};", parts.join("; "))
        },
    }
}

/// PolypMedusaLifecycle: mature objects through stages, while freezing high
/// risk objects until reviewed.
pub fn get_lifecycle_state(input: &LifecycleInput) -> JellyLifecycleState {
    let penalty: i32 = match input.risk_level {
        JellyRiskLevel::Low => 0,
        JellyRiskLevel::Medium => 10,
        JellyRiskLevel::High => 35,
        JellyRiskLevel::Critical => 80,
    };
    let raw_score = i32::try_from(input.usage_count).unwrap_or(i32::MAX / 2) * 2
        + i32::try_from(input.review_score).unwrap_or(100) * 4 / 10
        + i32::try_from(input.verification_score).unwrap_or(100) * 4 / 10
        - penalty;
    let maturity_score = raw_score.clamp(0, 100) as u32;

    let (stage, next_possible_stages) = if matches!(
        input.risk_level,
        JellyRiskLevel::Critical | JellyRiskLevel::High
    ) {
        (LifecycleStage::Frozen, vec![LifecycleStage::Ephyra])
    } else if input.usage_count == 0 && input.review_score == 0 {
        (LifecycleStage::Dormant, vec![LifecycleStage::Polyp])
    } else if maturity_score < 30 {
        (LifecycleStage::Polyp, vec![LifecycleStage::Ephyra])
    } else if maturity_score < 60 {
        (LifecycleStage::Ephyra, vec![LifecycleStage::Medusa])
    } else if input.usage_count >= 30
        && input.review_score >= 80
        && input.verification_score >= 80
        && input.risk_level == JellyRiskLevel::Low
    {
        (
            LifecycleStage::Bloom,
            vec![LifecycleStage::Medusa, LifecycleStage::Frozen],
        )
    } else {
        (
            LifecycleStage::Medusa,
            vec![LifecycleStage::Bloom, LifecycleStage::Dormant],
        )
    };

    JellyLifecycleState {
        object_id: input.object_id.clone(),
        object_type: input.object_type,
        stage,
        maturity_score,
        next_possible_stages,
    }
}

fn base_routes(signal_type: JellySignalType) -> &'static [&'static str] {
    match signal_type {
        JellySignalType::Wish => &["Wish Pool", "Residual Cards"],
        JellySignalType::ReverseWish => &["Reverse Wish Pool", "Shared Cache candidate"],
        JellySignalType::Garbage => &["ResidualDigestor"],
        JellySignalType::ResidualCard => &["Review Pool", "Skill Capsules"],
        JellySignalType::SkillHit => &[
            "Skill Capsules",
            "Contribution Ledger",
            "BioluminescentFeedback",
        ],
        JellySignalType::CacheHit => &["BioluminescentFeedback", "Contribution Ledger"],
        JellySignalType::Review => &["Review Pool", "TransparentAuditLayer"],
        JellySignalType::SafetyRisk => &["CnidocyteSafetyGate", "Review Pool"],
        JellySignalType::BiasAlert => &["Bias Shelter"],
        JellySignalType::HumanTransition => &["Human Transition Layer"],
        JellySignalType::WorldExperience => &["World Experience Gateway", "Residual Cards"],
        JellySignalType::ExternalConnector => &["Ecosystem Gateway", "Safety Gate"],
        JellySignalType::VersionEvent => &["Polyphonic Versioning"],
    }
}

fn contains_any(text: &str, needles: &[&str]) -> bool {
    needles.iter().any(|needle| text.contains(needle))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn signal(
        signal_type: JellySignalType,
        privacy_level: JellyPrivacyLevel,
        risk_level: JellyRiskLevel,
    ) -> JellySignal {
        JellySignal {
            id: "sig-1".to_owned(),
            signal_type,
            source_module: "test-source".to_owned(),
            target_module: None,
            summary: "repeat work order with high evidence".to_owned(),
            payload_ref: None,
            privacy_level,
            risk_level,
            status: JellySignalStatus::Received,
            created_at: "2026-05-08T00:00:00Z".to_owned(),
            metadata: Metadata::new(),
        }
    }

    #[test]
    fn residual_formula_clamps_and_preserves_sum() {
        let residual_d = 0.37;
        let closure_c = closure_from_residual_d(residual_d);
        assert!((closure_c + residual_d - 1.0).abs() < f64::EPSILON);
        assert_eq!(closure_from_residual_d(2.0), 0.0);
        assert_eq!(residual_d_from_closure(-1.0), 1.0);
    }

    #[test]
    fn safety_blocks_private_public_sensitive_signal() {
        let mut signal = signal(
            JellySignalType::ExternalConnector,
            JellyPrivacyLevel::Private,
            JellyRiskLevel::Low,
        );
        signal.target_module = Some("public cache".to_owned());
        signal.metadata.insert("apiKey".to_owned(), "secret".into());
        signal
            .metadata
            .insert("writeAction".to_owned(), true.into());

        let decision = evaluate_jelly_safety(&signal);

        assert!(!decision.allowed);
        assert_eq!(decision.risk_level, JellyRiskLevel::High);
        assert!(decision.required_actions.contains(&RequiredAction::Redact));
        assert!(decision
            .required_actions
            .contains(&RequiredAction::ConsentRequired));
        assert!(decision
            .required_actions
            .contains(&RequiredAction::HumanReview));
    }

    #[test]
    fn safety_quarantines_cheating_and_persona_risks() {
        let mut signal = signal(
            JellySignalType::WorldExperience,
            JellyPrivacyLevel::Team,
            JellyRiskLevel::Medium,
        );
        signal.summary =
            "attempt live multiplayer control anti-cheat bypass with impersonation".to_owned();

        let decision = evaluate_jelly_safety(&signal);

        assert!(!decision.allowed);
        assert_eq!(decision.risk_level, JellyRiskLevel::Critical);
        assert!(decision
            .required_actions
            .contains(&RequiredAction::Quarantine));
        assert!(decision
            .required_actions
            .contains(&RequiredAction::LicenseCheck));
    }

    #[test]
    fn router_uses_cache_and_local_for_private_skill_hit() {
        let signal = signal(
            JellySignalType::SkillHit,
            JellyPrivacyLevel::Private,
            JellyRiskLevel::High,
        );

        let decision = route_jelly_signal(&signal);

        assert_eq!(decision.route_to[0], "Skill Capsules");
        assert!(decision.use_cache_first);
        assert!(decision.use_local_only);
        assert!(decision.requires_human_review);
    }

    #[test]
    fn digest_creates_reusable_candidate_for_high_evidence_work_order() {
        let mut signal = signal(
            JellySignalType::Garbage,
            JellyPrivacyLevel::Team,
            JellyRiskLevel::Low,
        );
        signal
            .metadata
            .insert("evidenceStrength".to_owned(), 90_u32.into());
        signal
            .metadata
            .insert("domain".to_owned(), "support".into());

        let result = digest_residual_signal(&signal);

        assert_eq!(result.waste_class, WasteClass::Recyclable);
        assert!(matches!(
            result.residual_card_candidate,
            Some(ResidualCardCandidate {
                reusable: true,
                ref domain,
                target_d,
                ..
            }) if domain == "support" && (target_d - 0.2).abs() < f64::EPSILON
        ));
    }

    #[test]
    fn digest_never_reuses_sensitive_high_risk_material() {
        let mut signal = signal(
            JellySignalType::Garbage,
            JellyPrivacyLevel::Private,
            JellyRiskLevel::High,
        );
        signal
            .metadata
            .insert("medicalRecord".to_owned(), "raw".into());

        let result = digest_residual_signal(&signal);

        assert_eq!(result.waste_class, WasteClass::Harmful);
        assert!(result.residual_card_candidate.is_none());
    }

    #[test]
    fn privacy_membrane_blocks_unredacted_public_crossing() {
        let decision = can_cross_privacy_membrane(&PrivacyMembraneInput {
            from: JellyPrivacyLevel::Team,
            to: JellyPrivacyLevel::Public,
            privacy_level: JellyPrivacyLevel::Team,
            risk_level: JellyRiskLevel::Medium,
            has_consent: true,
            is_redacted: false,
        });

        assert!(!decision.allowed);
        assert!(decision.reason.contains("redaction required"));
    }

    #[test]
    fn privacy_membrane_allows_redacted_consented_community_structure() {
        let decision = can_cross_privacy_membrane(&PrivacyMembraneInput {
            from: JellyPrivacyLevel::Team,
            to: JellyPrivacyLevel::Community,
            privacy_level: JellyPrivacyLevel::Team,
            risk_level: JellyRiskLevel::Low,
            has_consent: true,
            is_redacted: true,
        });

        assert!(decision.allowed);
    }

    #[test]
    fn drift_prefers_cheap_for_low_risk_repetitive_signals() {
        let signal = signal(
            JellySignalType::Wish,
            JellyPrivacyLevel::Team,
            JellyRiskLevel::Low,
        );

        let decision = optimize_jelly_drift(&signal);

        assert!(decision.use_cheap_model_first);
        assert!(!decision.escalate_to_strong_model);
    }

    #[test]
    fn drift_avoids_model_calls_for_critical_risk() {
        let signal = signal(
            JellySignalType::SafetyRisk,
            JellyPrivacyLevel::Private,
            JellyRiskLevel::Critical,
        );

        let decision = optimize_jelly_drift(&signal);

        assert!(decision.use_local_first);
        assert!(!decision.use_cheap_model_first);
        assert!(!decision.escalate_to_strong_model);
    }

    #[test]
    fn lifecycle_blooms_only_verified_low_risk_objects() {
        let state = get_lifecycle_state(&LifecycleInput {
            object_id: "skill-1".to_owned(),
            object_type: LifecycleObjectType::Skill,
            usage_count: 35,
            review_score: 90,
            verification_score: 90,
            risk_level: JellyRiskLevel::Low,
        });

        assert_eq!(state.stage, LifecycleStage::Bloom);
        assert_eq!(state.maturity_score, 100);
    }

    #[test]
    fn lifecycle_freezes_high_risk_objects() {
        let state = get_lifecycle_state(&LifecycleInput {
            object_id: "version-1".to_owned(),
            object_type: LifecycleObjectType::Version,
            usage_count: 99,
            review_score: 100,
            verification_score: 100,
            risk_level: JellyRiskLevel::High,
        });

        assert_eq!(state.stage, LifecycleStage::Frozen);
        assert!(state.next_possible_stages.contains(&LifecycleStage::Ephyra));
    }
}
