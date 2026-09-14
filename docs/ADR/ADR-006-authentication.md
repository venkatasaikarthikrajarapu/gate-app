# ADR-006: Single-Student Authentication Architecture

## Context
Requirement R10 specifies that the system serves exactly one student. Overly complex multi-tenant OAuth/email infrastructure introduces friction, while unauthenticated open access creates security risks on shared local networks.

## Decision
1. Lightweight single-user authentication:
   - Password hashed using bcrypt (12 rounds).
   - Session token issued as an HttpOnly, SameSite=Strict secure cookie.
2. First-run /setup onboarding flow allows student to set their master password and configure their preparation profile.
3. Keep an auth-ready User entity to allow future extension without schema refactoring.

## Consequences
- Zero external auth provider dependencies.
- Safe local and networked usage without friction.
