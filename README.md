# Gender Reveal application
## Functional requirements: 
- The guests access the Guest mode with port 3002, and can do the following actions: 
  + The guest can have an option to choose the Gender that they guess. The option that they chose will be highlighted using button hover styling (scale 1.1 and color change). If they chose "Boy", button becomes Blue color, if they chose "Girl", button becomes Pink color.
  + When the admin press a Countdown button, the Guest can see the count down with beautiful effect (looks like a New Year Eve's countdown) , then first a fake message appears with booming effect.
  + After 10 seconds, we add a new message saying that "Oh that's not true" with a surprise effect.
  + When admin clicks again on the Reveal button, a new countdown (with the same style and effect as the first) appears, when the Countdown goes for a half, a message appears "Be Gao is a ... " and wait for the completion from the true gender, after that the Guest can see the true gender of the baby, with pink colour in the background with balloons going up at the same time, and the gender (It's a girl) message. The fake message must disappear.
  + Add the end, showing a statistics of percentage and how many people have chosen boy or girl. 
  + If admin clicks on Reset button, the frontend of Guest must be reset to the first page. 

- The admin page is running from another port (3001) The admin can: 
  + Have a button to turn the Countdown on. 
  + Have a button to reveal the gender.
  + The admin can reset the guests frontend. When admin clicks on Reset button, all frontend must be reset to their first page (with Boy or Girl buttons). 

All the frontend elements should be in the center of the screen. 

### How to run server

- `npm run dev`

### How to run admin console

Go to the `admin` folder: 
- Run with `localhost`:
`npm run dev -- --port 3001 `

- Run with your host: 
`npm run dev -- --port 3001 --host <host_ip_address>`

### How to run guest console
Go to the `guest` folder: 

- Run with `localhost`:
`npm run dev -- --port 3002 `

- Run with your host: 
`npm run dev -- --port 3002 --host <host_ip_address>`

