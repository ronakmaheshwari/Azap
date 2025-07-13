# 💸 Azap – End-to-End Fintech Simulation Platform

> A robust full-stack application simulating real-world payment workflows: QR-based payments, bank settlement, merchant alerts, and more — built to reflect modern fintech systems.

---

## 🎯 Vision

Azap was created to bridge the gap between theory and real-world app development — simulating every layer you'd find in a production-grade fintech product.

> This isn't a boilerplate. It's a blueprint for building scalable, maintainable financial apps.

---

## 🚀 Features at a Glance

### 👥 User Side
- ✅ **User Authentication** (email/phone based, passwordless planned)
- 🔄 **Scan QR Code** to pay merchant
- 📋 **Transaction history & state tracking**
- 🔐 Planned: OAuth via Phone/Email

### 🏪 Merchant Side
- ✅ **Merchant Login** (Next.js UI & backend integration in progress)
- 🔐 Planned: Google OAuth
- 🧾 **QR Code Generator** for merchant-specific payment addresses
- 🔔 **Real-Time Notifications** when payment is received (webhook + alert system)
- 🏦 **Scheduled Bank Offramp** – balance auto-withdrawn to linked account every 48 hours

### 🔮 Upcoming Features
- 🔁 Peer-to-peer payments between users
- 📈 Transaction insights via charts (Recharts/Chart.js)
- 🛠 Merchant dashboard to manage users and volume

---

## 🧠 Why This Project?

Many tutorials help you code "an app." Few help you design, scale, and **think** like a product engineer.

Azap was created to answer:
- What’s the right complexity for a fintech MVP?
- How do you think in terms of flows, not just pages?
- Where does tech like webhooks and sweeping services fit in?

---

## 🏗 Tech Stack

| Layer     | Tech                                   |
|-----------|----------------------------------------|
| Frontend  | React, Next.js (App Router)            |
| Backend   | Node.js, Express (Webhook APIs)        |
| DB        | PostgreSQL                             |
| Infra     | Docker, optional Cloudflare Tunnel     |
| Charts    | Recharts / Chart.js (Planned)          |
| Banking   | Simulated Bank APIs (HDFC, SBI, Axis)  |

---

## 📁 Project Structure

```bash
azap/
├── apps/
│   ├── user-app/            # Next.js frontend (users)
│   └── merchant-app/        # Next.js frontend (merchant)
├── backend/
│   ├── webhook-handler/     # Express: handles bank callbacks
│   ├── sweeper/             # Node: scheduled scripts (bank settlement)
├── db/                      # Schema + migrations
└── README.md
```

---

## 🧪 Setup & Usage

### Prerequisites
- Node.js ≥ 18
- pnpm
- PostgreSQL

### Getting Started
```bash
# Install dependencies
pnpm install

# Start user frontend
pnpm --filter user-app dev

# Start webhook server
pnpm --filter webhook-handler dev

# Start sweeper tasks (optional)
pnpm --filter sweeper start
```

---

## 🗺 Feature Roadmap

| Feature                         | Status        |
|--------------------------------|---------------|
| User login (Next.js)           | ✅ Completed  |
| Merchant login                 | 🔧 In Progress |
| Scan & pay via QR              | 🔧 In Progress |
| Bank webhook handling          | ✅ Completed   |
| Merchant QR generator          | 🔧 Planned     |
| Real-time merchant alerts      | 🔧 Planned     |
| OAuth (Google + Phone/Email)   | 🔧 Planned     |
| Bank settlement sweeper        | 🔧 Planned     |
| Analytics dashboard & charts   | 🔧 Planned     |
| P2P user transfers             | 🔧 Planned     |

---

## 🤝 Contributing

Contributions are welcome. PRs, suggestions, and issues are appreciated.

```bash
# Fork the repo
# Create a new branch
# Make your changes and test
# Submit a PR
```

Follow code style rules (Prettier + ESLint) and write meaningful commit messages.

---

## 📄 License

MIT © [Ronak Maheshwari](https://github.com/ronakmaheshwari)

---

> Azap is your lab to experiment with QR-ledger flows, bank logic, and fintech-grade thinking. Go beyond clones. Build real things.
