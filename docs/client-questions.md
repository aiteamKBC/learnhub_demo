# Questions for the client

Business decisions that are **not ours to make**. Defaults are built so the demo works.
We go through this list with the client at the end of the project. Claude Code: add new
questions here, never decide them in code.

| # | Topic | What the demo does now | Decide |
|---|---|---|---|
| 1 | Revenue shares | Staff set the platform fee in the console: a default for new instructors (kept on approval) and a custom fee per instructor, for marketplace sales. Instructor-coupon sales (97%) and the subscription pool (25%) are fixed. Seeded default: 63% fee (37% to the instructor) | Final default fee; whether coupon and pool rates should also be per instructor |
| 2 | Instructor payouts | £25 minimum, monthly, 30-day hold | Minimum, frequency, hold |
| 3 | Refunds | 30-day window, instant self-service (the approved mockup said admin-reviewed) | Instant or reviewed |
| 4 | Tax | Prices shown tax-inclusive | Turn on Stripe Tax / VAT? |
| 5 | Currencies | Several currencies; some Stripe can't take | Which to offer |
| 6 | Plan prices | Personal £19.99/month with 7-day trial; Team £360/seat/year, min 5 seats | Prices, trial, minimum |
| 7 | Content protection (DRM) add-on | £49/month | Price |
| 8 | Team Plan sales contact | Staff set it in console > Settings > General > "Contact email" (2026-11-16). While it is empty, "Book a demo", "Contact us" and "Talk to our team" are hidden; no placeholder address ships | The real contact address |
| 9 | Notification wording, starter badges | Our wording; 5 badges | Wording, badge set |
| 10 | Microsoft sign-in audience | Any work/school + personal accounts | Or company tenants only |
| 11 | Production domain and hosting | None yet | Domain, hosting; needed for live Stripe/Bunny webhooks and Azure CORS |
| 12 | Commission rules | First match wins: course rule > instructor rule > category rule > price-band rule > the instructor's own rate > the default. Category and price-band rules sit above the instructor's own rate because every instructor gets one on approval. Discounts reduce the instructor's share (a switch in Settings turns that off) | Which rules, their order, and how discounts affect commission |
| 13 | Payout methods | Stripe Connect paid automatically; PayPal, Wise and bank recorded and paid by staff by hand | Which methods to offer |
| 14 | Payout requests | Instructors can request their available balance (past the hold, above the minimum) | On request, automatic monthly, or both |
| 15 | Regional pricing | Staff can set a price per country; otherwise the currency price | Use it? Which countries? |
| 16 | Promotions | One promotion per order; instructor coupons still work; no stacking | Stacking rules, first-purchase offer |
| 17 | Plans and included courses | Each plan can list its courses; empty = every course marked "in subscription" | Which courses per plan |
| 18 | Certificate expiry | No expiry by default; staff can set one per certificate | Should some courses expire (e.g. compliance)? |
| 19 | 2-step sign-in | Optional for users; staff can be required to use it | Require for staff / company admins? |
| 20 | Maintenance mode, guest browsing, registration | All on (maintenance off) | Defaults for launch |
| 21 | Payout hold and refund window | The payout hold is never shorter than the refund window (30 days each), so money cannot be paid out and then refunded | Keep them linked? |
| 22 | Instructor invitations | Staff invite by email; the link works for 7 days. **Answered 2026-11-08: yes**, built: a pending list with resend and cancel | Closed |
| 23 | HR system: fields imported (M17) | Name, email, job title, department, manager, employment status, start date, hours, working pattern. **Answered 2026-11-16: all of them**, built in M17 | Closed |
| 24 | HR system: sync frequency (M17) | Every hour, plus a "Sync now" button. **Answered 2026-11-16: yes** | Closed |
| 25 | HR system: matching people (M17) | An email match is only a suggestion; an admin confirms it. **Answered 2026-11-16: yes** | Closed |
| 26 | HR system: training records (M17) | An admin maps each Breathe training title to a requirement; imported records follow the requirement's renewal rule. **Answered 2026-11-16: yes** | Closed |
| 27 | HR system: leavers (M17) | Flagged only; never removed from LearnHub. **Answered 2026-11-16: flagged** | Closed |
| 28 | HR system: leave visibility (M17) | Approved leave shows "On leave until …" to admins and managers. **Answered 2026-11-16: yes** | Closed |
| 29 | Privacy policy and terms | **Answered 2026-11-16: write them.** /privacy and /terms are drafted from what the platform really does (data kept, processors, cookies, payments, refunds) and linked from the footer and sign-up | The client's legal adviser reviews the wording before launch |
| 30 | Course access period vs tokens and packages | A course's limited access period (console > Courses) applies to direct purchases only; a token unlock or a package gives access for as long as the unlock or package lasts (lifetime today) | Should token unlocks and packages also follow the course's access period? |
| 31 | Programs: full groups (M18) | A group or cohort that is full refuses new learners; staff open another group | Waitlist instead, or open a new group automatically? |
| 32 | Programs: bank holiday calendars (M18) | Each cohort picks England and Wales, Scotland or Northern Ireland (GOV.UK data) | Any other countries a provider needs? |
| 33 | Programs: prices and instalments (M21/M22) | Built as data: staff add offers per program (Console › Programs › Offers): whole program or one module, live or recorded, a price tier, tokens for recorded modules, and up to N monthly payments for live places. Monthly payments are the price ÷ N rounded **up** to the penny, so the total can be a few pence over the list price | Price per program, module and mode; the number of monthly payments; is rounding up acceptable? |
| 34 | Programs: refunds and withdrawals (M21/M22) | Built with a default: a program paid in full follows the normal refund window (setting **Refund window**); a monthly plan is refunded by staff in Stripe, not in the app | Policy for cohort seats and monthly plans |
| 35 | Programs: seat swap cut-off (M22) | Built as a program setting (Console › Programs › program › Settings › Company seats): no cut-off, a progress %, or a week of the cohort. Past it a swap still works but needs a reason, and the provider sees "past the cut-off". Default: no cut-off | Default cut-off (e.g. a % of progress, or a week number)? Should swaps past it be refused instead? |
| 36 | Programs: off-the-job hours (M19) | Not set yet | Default OTJ target per program; daily cap on hours learners log |
| 37 | Programs: recording live sessions (M20) | Built with a default: record automatically (setting **Record program sessions and workshops in Teams automatically**, on) | Should every session and workshop be recorded by default, and do learners need to be told or asked first? |
| 38 | Programs: who runs workshops (M20) | Built with a default: cohort managers create workshops and mark attendance; tutors can see them | Should a tutor who hosts a workshop also mark its attendance? |
| 39 | Programs: missed monthly payments (M21) | Built with a default: the learner keeps access for 7 days after a failed payment (setting **Days a program learner keeps access after a monthly payment fails**), then access pauses until they pay; Stripe's own retries continue meanwhile | How long should the grace period be, and should the learner leave their group if they never pay? |
| 40 | Programs: who sets prices (M21) | Built with a default: staff with **Build programs** (the Curriculum designer role) add and edit offers | Should pricing be a separate permission (for example, a sales role)? |
| 41 | Programs: company seat prices (M22) | Built with a default: a company pays the same price per seat as one person (the offer's price tier), in the company's currency, by card, in full. No volume discount | Volume discounts or company prices? Invoices or instalments for companies? |
| 42 | Programs: holding intake places for companies (M22) | Built with a default: places left are checked when the company orders and pays, but a place in a group is only taken when a seat is given to a person; if the intake fills up meanwhile, that person keeps the seat in the cohort and cohort managers are asked to place them | Should a paid order hold its places in the intake straight away? |
| 43 | Programs: company refunds (M22) | Built with a default: a company program order is refunded by staff in Stripe, not in the app. A seat given by mistake can be taken back by the company before the learner starts | Refund policy for company seats? |
| 44 | Programs: who approves a swap for the company (M22) | Built with a default: the owner or an admin, or the line manager of the person who would get the seat. A request raised by someone allowed to approve is approved by the company straight away | Should the current seat holder's manager approve too? |
| 45 | Programs: one person with a personal place AND a company seat on the same program (review 2026-11-17) | Not reconciled: both are allowed and kept apart. The person has two enrolments, each counts a place, and the learner pages open the one used most recently. Nothing stops the company giving a seat to someone who already bought the program, or the reverse | Should the company seat replace the personal one (and the personal purchase be refunded), or should one of the two be refused? |
| 46 | Programs: a company seat holder leaves the company (review 2026-11-17) | Built with a default: removing a member doesn't touch their program seat. Once they have started, the company gets the seat back with a swap, which the provider approves | Should removing someone from the company release their seat automatically (progress kept)? |
| 47 | Programs: module learners and the group's workshops (review 2026-11-17) | Built with a default: anyone placed in the cohort can book its workshops, including someone who bought only one module | Should workshops be limited to whole-program learners, or to the module they belong to? |
