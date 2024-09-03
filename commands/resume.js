const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function resume(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('앗, 오류..')
                .setDescription('❌ 재생 중인 사람을 찾을 수 없어요..');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        player.pause(false);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**▶️ 재생이 다시 시작됐어요!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error processing resume command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('앗, 오류..')
            .setDescription('❌ 요청을 처리하는 중에 문제가 생겼어요..');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "resume",
    description: "재생을 다시 시작해요",
    permissions: "0x0000000000000800",
    options: [],
    run: resume
};
