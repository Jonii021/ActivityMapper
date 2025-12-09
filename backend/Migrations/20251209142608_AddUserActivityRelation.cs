using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserActivityRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Activities_CreatedByUserId",
                table: "Activities",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Users_CreatedByUserId",
                table: "Activities",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Users_CreatedByUserId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_CreatedByUserId",
                table: "Activities");
        }
    }
}
