using Microsoft.EntityFrameworkCore;

namespace CduNsa.Api
{
    public class CduNsaDataContext : DbContext
    {
        public DbSet<Member> Members { get; set; }

        public CduNsaDataContext(DbContextOptions<CduNsaDataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Member>()
                .Property(x => x.Id).HasDefaultValueSql("newsequentialid()");

            base.OnModelCreating(modelBuilder);
        }
    }
}