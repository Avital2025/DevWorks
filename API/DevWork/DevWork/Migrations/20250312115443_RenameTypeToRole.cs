using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevWork.Migrations
{
    /// <inheritdoc />
    public partial class RenameTypeToRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "usersList",
                newName: "Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "usersList",
                newName: "Type");
        }
    }
}
