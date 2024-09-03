/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/

const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

module.exports = {
  name: "help",
  description: "철수의 사용법을 보여줘요",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
      const botName = client.user.username; 

      const helpDescription = `
\`\`\`css
Welcome to ${botName}!

영희의 친구 철수예요. 사용법은 다음과 같아요!

[ /play    ] - 노래를 재생해요
[ /pause   ] - 현재 노래를 잠깐 멈춰요
[ /resume  ] - 멈춘 노래를 다시 재생해요
[ /lyrics  ] - 노래 가사를 보여줘요
[ /skip    ] - 다음 노래로 넘어가요
[ /stop    ] - 철수를 종료해요
[ /np      ] - 지금 재생 중인 노래를 보여줘요
[ /volume  ] - 철수의 볼륨을 조절해요
[ /ping    ] - 철수의 반응 속도를 체크해요
[ /support ] - 서포트 서버 정보를 보여줘요
[ /help    ] - 철수의 사용법을 보여줘요
\`\`\`
      `;

      const embed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`${botName} Help`)
        .setThumbnail(client.user.displayAvatarURL()) 
        .setDescription(helpDescription)
        .setFooter({ text: `Prime Music v1.0`, iconURL: client.user.displayAvatarURL() }) 
      

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};


/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/
