# Cheat-Inspector

<p align="center">
  <img width="460" src="https://i.imgur.com/rIV016t.png">
</p>

## Inspiration
Cheat-Inspector is inspired by the need to maintain fairness and integrity in online hackathons and competitions. Plagiarism and project reuse have been significant issues that can dampen the spirit of such events. 

Cheat-Inspector is a hackathon sentry that allows organizers to provide a fair competing platform in online events. Since plagiarism and re-use are the major problems in such submissions which ruins the spirit of hackathons,  It utilizes intelligent algorithms to calculate project entropy and snapshots of participants' projects in real-time and visualizes the same for the organizers as a live graph in a pleasant user interface.

## What it does
Cheat-Inspector consists of multiple components:

- Cheat-Inspector-Server : web server written in TypeScript to act as the service to expose data for Cheat-Inspector-dashboards. Provides routes which utilize Redis-JSON and Redis-TimesSeries to return data for business logic. Handle user creation, team creation, and reteriving the same from dashboard.
- Cheat-Inspector-Client : CLI written in Golang utilizing go-routines for performance ⚡ which calculates project entropy and snapshots and emits them to Ably 
- Ably : Ably is the platform to power synchronized digital experiences in realtime. we are using ably to store, publish, synchronize and manage realtime data which is being emited from Cheat-Inspector-Clients
- Cheat-Inspector-Dashboard : a responsive and dynamic single-page application build using React and TailWind CSS, designed in a monochrome and minimal UI to focus on important data. Also provisions realtime graphs which render live feed of project status.

## How we built it
![Project Architecture](https://i.imgur.com/6plUsbM.png)


Dashboard
![https://i.imgur.com/NOlWUc5.png](https://i.imgur.com/LDsirnE.png)

![https://i.imgur.com/ox23m9A.png](https://i.imgur.com/na1TpEm.png)

## Cheat-Inspector Client
![https://i.imgur.com/zYwe142.png](https://i.imgur.com/zYwe142.png)
- **The Binary**
  - Can be compiled for any platform, any architecture as far as GoLang supports it. 
  - Generates unique signature for each device, which cannot be altered by changing configurations or be spoofed. So single machine cannot act as multiple devices.
  - Does **NOT** require admin privileges.
  - Device signatures are hardware independent, as they can be easily spoofed by VMs. MAC and BIOS settings are also ignored as they can be easily manipulated.
  - Automatically identifies the platform to display in the admin panel.

- **The Interface**
  - Interactive command line interface with option to navigate using arrow keys and validation check indicators builtin. If the validation is about to fail, the terminal shows red with an error message and there's no need to work-up again and again.
  - Secure TeamID Input : Since team IDs are used to join a team, the interface masks the input with `*` to add a layer of security in the user interface.

- **Configuration**
  - To make it effortless for users to use the application, server credentials can be embedded into the binary itself by the organizers (single point configuration declarations), and the participants can directly run the same.
  - In case if there are changes in server deployments, or the organizers come up with alternative servers to relay the updates, a configuration file can be used to declare the endpoints.
  - Restarting the client will first check if a configuration file is present. If its not, then display a message to ensure that the user knows, and go ahead to load the default configurations.
  - **Ignore Custom Directories** : since there can by multiple directories which contain auto-generated codebase, depending on the tech stack being used, therefore there is a provision to list all of them in the config file in the **ignore** section. Cheat-Inspector would then ignore those directories while calculating snapshots and entropy.

- **Functionality**
  - Allows user to create a team of people working together in an event / competition.
  - Allows user to join an existing team 
  - Allows user to register their device 
  - Thanks to unique device signatures, can identity old devices and avoid duplicate logins.
  - Walks through the project to calculate entropy and snapshot scores and feeds them to api servers.

- **Fancy Tech**
  - Written implementing go-routines for concurrency ⚡ and speed, utilizes minimal system resources, non blocking.
  - Recursively walks the the directory tree and creates a hashmap of the project in the memory.
  - Calculates the snapshot score and entropy of all the files in each iteration.
  - Snapshot score depends upon the file contents, length and size.
  - Entropy is a name given to diff-match score, which is basically the number of insertions and deletions required to move from one state to another. 
  - The entropy is calculated using the [golang port](https://pkg.go.dev/github.com/sergi/go-diff/diffmatchpatch) of [Neil Fraser's google-diff-match-patch](https://github.com/google/diff-match-patch) code 
  - Written in Golang, can be compiled to native binary for any operating system and architecture.
  

## Cheat-Inspector Server
![https://i.imgur.com/Kfs08mh.png](https://i.imgur.com/Kfs08mh.png)

- Cheat-Inspector Server is written in typescript with modern tooling to quickly prototype and debug the application.
- Connects to reddismod instance and ensures that connection with json and timeseries module is made.
- Provides routes for team formation, team joining, device registration.
- To run locally, run `yarn install` then `yarn start:dev` or use the docker image.
- Follows a uniform logging scheme to make it easier to debug.
- Supports keywords like `now` to fetch all data till the present timestamp.
- Divided into modules and services keep related codebase together and therefore make it easier to maintain.
- Configurations can be accessed in `config` directory.

## Cheat-Inspector Dashboard
![https://i.imgur.com/6teOPnt.png](https://i.imgur.com/6teOPnt.png)
- Cheat-Inspector dashboard is the main dashboard that is used by event organizers.
- the dashboards is written using ReactJS, and TailwindCSS and uses [react-vis](https://uber.github.io/react-vis/) which in-turn is based on D3.
- Configurations:
  - there are no configurations needed for the dashboard, when deploying, a single line configuration change is needed to point the dashboard to the API server.

- Features
  - Show team details
  - Show team member details along-with their operating systems
  - Completely responsive and runs smoothly on mobile. 
  - View timeseries data in form of graph for snapshot values and entropy values
  - LIVE feed from participant's devices.
  - Click on any timestamp to compare other timestamps from that value.
  - Use of colors to demonstrate additions, deletions and no changes.
  - Please refer the demo for more:
 
### Walkthrough
![https://i.imgur.com/VIMSzVv.png](https://i.imgur.com/VIMSzVv.png)
- shows the friendly name of each device in team, and also their platforms.

![https://i.imgur.com/ZqIuY4T.png](https://i.imgur.com/ZqIuY4T.png)
- opening the details of any device shows a live graph of project snapshot and entropy.
- (refer video)
![https://i.imgur.com/LDsirnE.png](https://i.imgur.com/LDsirnE.png)
![https://i.imgur.com/na1TpEm.png](https://i.imgur.com/na1TpEm.png)

## Challenges we ran into
During the development of Cheat-Inspector, we encountered several challenges. These challenges included managing real-time data synchronization, optimizing performance, and ensuring the security of the system. We also had to handle various configurations for different use cases, including organizers embedding server credentials into the binary and providing the flexibility to use configuration files.

## Accomplishments that we're proud of
We are proud of the following accomplishments with Cheat-Inspector:
- Creating a system that can efficiently calculate project entropy and snapshots in real-time, providing organizers with valuable insights into participant activities.
- Developing a secure and user-friendly command-line interface for participants to interact with the system.
- Building a responsive and dynamic dashboard for event organizers to monitor and manage online competitions.
- Implementing real-time data synchronization and visualization to enhance the user experience.

## What we learned
During the development of Cheat-Inspector, we learned valuable lessons about handling real-time data, concurrency, and optimizing system performance. We also gained insights into creating a secure and user-friendly command-line interface and building dynamic web applications using modern web development technologies.

## What's next for Team
In the future, our team plans to further enhance Cheat-Inspector by adding more features and improving the user experience. We will continue to address the challenges and requirements of online hackathons and competitions, ensuring fair and competitive platforms for participants. Our goal is to make Cheat-Inspector a valuable tool for event organizers and participants alike.
