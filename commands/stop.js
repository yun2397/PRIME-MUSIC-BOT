const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function stop(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('앗, 오류가..')
                .setDescription('❌ 재생 중인 플레이어를 찾을 수 없어요..');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        player.stop();
        player.destroy();

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**⏹️ 재생이 멈추고 철수가 사라졌어요!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error processing stop command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('앗, 오류가..')
            .setDescription('❌ 요청을 처리하는 중에 문제가 생겼어요..');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "stop",
    description: "노래를 멈추고 철수를 없애버려요",
    permissions: "0x0000000000000800",
    options: [],
    run: stop
};
