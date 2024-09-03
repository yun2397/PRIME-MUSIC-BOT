const { EmbedBuilder } = require('discord.js');
const config = require('../config.js');

function createProgressBar(current, total, length = 20) {
    const progress = Math.round((current / total) * length);
    const emptyProgress = length - progress;

    const progressText = '▓'.repeat(progress); // Filled part 
    const emptyProgressText = '░'.repeat(emptyProgress); // Empty part
    const time = new Date(current * 2000).toISOString().substr(11, 8);
    const endTime = new Date(total * 2000).toISOString().substr(11, 8);

    return `\`${time}\` ${progressText}${emptyProgressText} \`${endTime}\``;
}

async function nowPlaying(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('앗, 오류가..')
                .setDescription('❌ 재생중인 노래가 없어요..');

            // Send the reply and fetch the sent message
            const reply = await interaction.reply({ embeds: [errorEmbed], ephemeral: true, fetchReply: true });

            // Set a timeout to delete the message after 1000 milliseconds (1 second)
            setTimeout(() => reply.delete().catch(console.error), 2000);
            return;
        }

        const progressBar = createProgressBar(player.position / 1000, player.current.info.length / 1000);

        const npEmbed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('🎵 재생 중..')
            .setDescription(`[${player.current.info.title} - ${player.current.info.author}](${player.current.info.uri})\n\n${progressBar}`)
            .setThumbnail(player.current.info.thumbnail);

        // Send the reply and fetch the sent message
        const reply = await interaction.reply({ embeds: [npEmbed], fetchReply: true });

        // Set a timeout to delete the message after 1000 milliseconds (1 second)
        setTimeout(() => reply.delete().catch(console.error), 2000);

    } catch (error) {
        console.error('Error processing now playing command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('앗, 오류가..')
            .setDescription('❌ 요청을 처리하는 중에 문제가 생겼어요..');

        // Send the reply and fetch the sent message
        const reply = await interaction.reply({ embeds: [errorEmbed], ephemeral: true, fetchReply: true });

        // Set a timeout to delete the message after 1000 milliseconds (1 second)
        setTimeout(() => reply.delete().catch(console.error), 2000);
    }
}

module.exports = {
    name: "np",
    description: "재생 중인 노래와 진행 바를 표시해요",
    permissions: "0x0000000000000800",
    options: [],
    run: nowPlaying,
};
