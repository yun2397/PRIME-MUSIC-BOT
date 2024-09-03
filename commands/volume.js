const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function volume(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);
        const volume = interaction.options.getInteger('level');

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('앗, 오류..')
                .setDescription('❌ 재생 중인 사람을 찾을 수 없어요..');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        if (volume < 0 || volume > 100) {
            return interaction.reply({ content: '볼륨은 0에서 100 사이로 설정해 주세요!', ephemeral: true });
        }

        player.setVolume(volume);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription(`🔊 철수의 볼륨이 **${volume}%** 로 설정되었어요!`);

        return interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error setting volume:', error);
        await interaction.reply({ content: '볼륨을 설정하는 동안 문제가 발생했어요..', ephemeral: true });
    }
}

module.exports = {
    name: "volume",
    description: "볼륨을 설정해요",
    permissions: "0x0000000000000800",
    options: [{
        name: 'level',
        description: '볼륨 레벨 (0-100)',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: volume
};
